import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { useBooks } from "../context/BooksContext";

const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Romance",
  "Self-Help",
  "Self Help",
  "Self Improvement",
  "Finance",
  "Productivity",
  "History",
  "Memoir",
  "Biography",
  "Other",
];

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const MAX_SIZE = 5 * 1024 * 1024;

export default function AddBookPage() {
  const navigate = useNavigate();
  const { addBook } = useBooks();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    type: "exchange",
    price: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateImage = (file) => {
    if (!file) return "Book cover image is required";

    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Only JPG, JPEG, and PNG images are allowed";
    }

    if (file.size > MAX_SIZE) {
      return "Image must be smaller than 5MB";
    }

    return null;
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.author.trim()) newErrors.author = "Author is required";
    if (!form.genre) newErrors.genre = "Please select a genre";
    if (!form.description.trim()) {
      newErrors.description = "Description is required";
    } else if (form.description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    const imageError = validateImage(imageFile);
    if (imageError) newErrors.image = imageError;

    if (form.type === "sell") {
      if (!form.price) {
        newErrors.price = "Price is required for books listed for sale";
      } else if (isNaN(form.price) || Number(form.price) <= 0) {
        newErrors.price = "Please enter a valid price";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (submitError) setSubmitError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageError = validateImage(file);
    if (imageError) {
      setErrors((prev) => ({ ...prev, image: imageError }));
      setImageFile(null);
      setImagePreview(null);
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, image: "" }));
    if (submitError) setSubmitError("");
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("author", form.author.trim());
      formData.append("genre", form.genre);
      formData.append("description", form.description.trim());
      formData.append("type", form.type);
      if (form.type === "sell") {
        formData.append("price", form.price);
      }
      formData.append("image", imageFile);

      const book = await addBook(formData);
      navigate(`/book/${book.id}`);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <h1 className="font-serif text-3xl font-bold text-ink">Add a Book</h1>
        <p className="mt-2 text-ink-light">
          List a book you&apos;d like to exchange or sell
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-xl border border-parchment bg-white p-8 shadow-sm"
          noValidate
        >
          {submitError && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {submitError}
            </div>
          )}

          {/* Book cover upload */}
          <div className="w-full">
            <label className="mb-1.5 block text-sm font-medium text-ink-light">
              Book Cover Image
            </label>

            {imagePreview ? (
              <div className="relative overflow-hidden rounded-xl border border-parchment">
                <img
                  src={imagePreview}
                  alt="Book cover preview"
                  className="aspect-[3/4] w-full max-w-xs object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink shadow hover:bg-white"
                >
                  Remove
                </button>
              </div>
            ) : (
              <label
                htmlFor="image"
                className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 transition-colors hover:border-leather/40 hover:bg-cream/50 ${
                  errors.image ? "border-red-400 bg-red-50/30" : "border-parchment"
                }`}
              >
                <span className="text-4xl">📷</span>
                <p className="mt-3 text-sm font-semibold text-ink">
                  Click to upload book cover
                </p>
                <p className="mt-1 text-xs text-ink-light">
                  JPG, JPEG, or PNG — max 5MB
                </p>
                <input
                  ref={fileInputRef}
                  id="image"
                  name="image"
                  type="file"
                  accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>
            )}

            {errors.image && (
              <p className="mt-1 text-sm text-red-600">{errors.image}</p>
            )}
          </div>

          <Input
            label="Book Title"
            id="title"
            name="title"
            placeholder="The Great Gatsby"
            value={form.title}
            onChange={handleChange}
            error={errors.title}
          />

          <Input
            label="Author"
            id="author"
            name="author"
            placeholder="F. Scott Fitzgerald"
            value={form.author}
            onChange={handleChange}
            error={errors.author}
          />

          <div className="w-full">
            <label
              htmlFor="genre"
              className="mb-1.5 block text-sm font-medium text-ink-light"
            >
              Genre
            </label>
            <select
              id="genre"
              name="genre"
              value={form.genre}
              onChange={handleChange}
              className={`w-full rounded-lg border bg-white px-4 py-2.5 text-ink transition-colors focus:border-leather focus:outline-none focus:ring-2 focus:ring-leather/20 ${
                errors.genre ? "border-red-400" : "border-parchment"
              }`}
            >
              <option value="">Select a genre</option>
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            {errors.genre && (
              <p className="mt-1 text-sm text-red-600">{errors.genre}</p>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="description"
              className="mb-1.5 block text-sm font-medium text-ink-light"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Tell readers about the condition and why you're sharing this book..."
              value={form.description}
              onChange={handleChange}
              className={`w-full rounded-lg border bg-white px-4 py-2.5 text-ink placeholder:text-ink-light/50 transition-colors focus:border-leather focus:outline-none focus:ring-2 focus:ring-leather/20 ${
                errors.description ? "border-red-400" : "border-parchment"
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="w-full">
            <span className="mb-2 block text-sm font-medium text-ink-light">
              Listing Type
            </span>
            <div className="flex gap-4">
              {[
                { value: "exchange", label: "Exchange" },
                { value: "sell", label: "Sell" },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg border-2 px-4 py-3 text-sm font-semibold transition-colors ${
                    form.type === option.value
                      ? "border-leather bg-parchment text-leather"
                      : "border-parchment bg-white text-ink-light hover:border-leather/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={option.value}
                    checked={form.type === option.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {form.type === "sell" && (
            <Input
              label="Price (₹)"
              id="price"
              name="price"
              type="number"
              min="0"
              step="1"
              placeholder="250"
              value={form.price}
              onChange={handleChange}
              error={errors.price}
            />
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Uploading..." : "List Book"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
