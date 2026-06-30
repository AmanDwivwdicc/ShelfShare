import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

export default function LandingPage() {

  const scrollDown = () => {
    document
      .getElementById("how-it-works")
      .scrollIntoView({ behavior: "smooth" });
  };


  return (
    <div className="min-h-screen">


      <Navbar variant="landing" />


      {/* HERO SECTION */}

      <section
        className="
        relative
        min-h-screen
        overflow-hidden
        flex
        items-center
        justify-center
        bg-gradient-to-b
        from-[#08172f]
        via-[#10294d]
        to-[#0b1b34]
        px-6
        text-white
        "
      >


        {/* subtle background */}

        <div className="
        absolute
        inset-0
        opacity-10
        bg-[radial-gradient(circle_at_top,#f5c38b,transparent_40%)]
        "/>



        <div className="
        relative
        max-w-4xl
        text-center
        ">


          <p className="
          mb-6
          text-sm
          uppercase
          tracking-[0.3em]
          text-orange-200
          ">
            Your community bookshelf
          </p>



          <h1
            className="
            font-serif
            text-5xl
            md:text-7xl
            font-bold
            leading-tight
            "
          >

            Share stories.
            <br/>

            <span className="text-orange-300">
              Swap shelves.
            </span>

          </h1>



          <p
          className="
          mx-auto
          mt-8
          max-w-2xl
          text-lg
          text-gray-300
          "
          >

          ShelfShare connects readers who want to exchange books
          or sell their favorites. Give your books a second life
          and discover your next great read from fellow book lovers.

          </p>



          <div
          className="
          mt-10
          flex
          justify-center
          gap-5
          "
          >


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




          {/* Scroll Button */}

          <button
  onClick={scrollDown}
  className="
  absolute
  left-1/2
  mt-16
  -translate-x-1/2
  animate-bounce
  text-white
  cursor-pointer
  hover:text-orange-300
  transition
  "
>

            <ChevronDown size={38}/>

          </button>



        </div>


      </section>





      {/* HOW IT WORKS */}


      <section
id="how-it-works"
className="
min-h-screen
flex
items-center
bg-white
px-6
py-24
"
>


        <div className="
        max-w-6xl
        mx-auto
        ">


          <p className="
          text-center
          uppercase
          tracking-widest
          text-sm
          text-orange-500
          ">
            Simple. Community. Impactful.
          </p>


          <h2
          className="
          mt-3
          text-center
          font-serif
          text-4xl
          font-bold
          text-ink
          "
          >

          How ShelfShare Works

          </h2>



          <div
          className="
          mt-16
          grid
          gap-10
          md:grid-cols-4
          "
          >


          {[
            {
              icon:"📚",
              title:"List Your Book",
              text:"Add books you want to sell or exchange."
            },

            {
              icon:"🔎",
              title:"Discover Books",
              text:"Find affordable books from other readers."
            },

            {
              icon:"💬",
              title:"Connect",
              text:"Send requests and connect with owners."
            },

            {
              icon:"🤝",
              title:"Exchange",
              text:"Complete the deal and enjoy reading."
            }

          ].map((step,index)=>(


            <div
            key={step.title}
            className="
            text-center
            "
            >

              <div className="
              mx-auto
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-orange-100
              text-4xl
              "
              >

              {step.icon}

              </div>


              <h3
              className="
              mt-5
              font-serif
              text-xl
              font-bold
              "
              >
              {step.title}
              </h3>


              <p className="mt-3 text-gray-600">
              {step.text}
              </p>


            </div>


          ))}


          </div>


        </div>


      </section>




      {/* CTA */}

      <section
className="
min-h-screen
flex
items-center
justify-center
bg-[#10294d]
px-6
text-center
text-white
"
>


<div className="max-w-3xl">


<p className="
uppercase
tracking-[0.3em]
text-sm
text-orange-300
mb-6
">
Join the community
</p>


<h2
className="
font-serif
text-5xl
md:text-6xl
font-bold
leading-tight
"
>
Ready to
<br />
share your shelf?
</h2>



<p
className="
mt-6
text-lg
md:text-xl
text-gray-300
max-w-xl
mx-auto
"
>
Give your books a second life and help another reader discover their next favorite story.
</p>



<Link to="/signup">

<Button
variant="primary"
size="lg"
className="mt-10"
>
Create Account
</Button>

</Link>


</div>


</section>



      <footer className="
      bg-[#08172f]
      py-8
      text-center
      text-gray-400
      ">

      © {new Date().getFullYear()} ShelfShare. Built for book lovers.

      </footer>



    </div>
  );
}