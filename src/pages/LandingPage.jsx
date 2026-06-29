import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar variant="landing" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-parchment via-cream to-cream px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #6b4423 0px, #6b4423 1px, transparent 1px, transparent 40px)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-leather">
            Your community bookshelf
          </p>
          <h1 className="font-serif text-4xl font-bold leading-tight text-ink sm:text-5xl md:text-6xl">
            Share stories.
            <br />
            <span className="text-leather">Swap shelves.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-light sm:text-xl">
            ShelfShare connects readers who want to exchange books or sell their
            favorites. Give your books a second life and discover your next great
            read from fellow book lovers.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/signup">
              <Button variant="primary" size="lg">
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-3xl font-bold text-ink">
            How ShelfShare Works
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-ink-light">
            A simple way to pass on books you&apos;ve finished and find new ones
            from people near you.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: "📗",
                title: "List Your Books",
                text: "Add books you want to exchange or sell. Set a price or offer them for swap.",
              },
              {
                icon: "🔍",
                title: "Browse & Discover",
                text: "Explore books from other readers. Filter by genre, type, and location.",
              },
              {
                icon: "🤝",
                title: "Connect & Trade",
                text: "Request a deal with the owner and arrange pickup or delivery.",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="rounded-xl border border-parchment bg-cream p-8 text-center"
              >
                <span className="text-4xl">{step.icon}</span>
                <h3 className="mt-4 font-serif text-xl font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-ink-light">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-leather px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold text-white">
            Ready to share your shelf?
          </h2>
          <p className="mt-3 text-parchment">
            Join thousands of readers giving books new adventures.
          </p>
          <Link to="/signup" className="mt-8 inline-block">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-leather hover:bg-cream"
            >
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-parchment bg-cream px-4 py-8 text-center text-sm text-ink-light sm:px-6">
        <p>&copy; {new Date().getFullYear()} ShelfShare. Built for book lovers.</p>
      </footer>
    </div>
  );
}
