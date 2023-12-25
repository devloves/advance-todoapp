import React from "react";
import { signIn } from "next-auth/react";

const Index = () => {
  return (
    <div>
      <section>
        <section className="sticky">
          <div className="max-w-lg px-4 sm:pt-24 pt-12 sm:pb-8 mx-auto text-left md:max-w-none md:text-center">
            <h1 className="font-extrabold leading-12 pb-3 tracking-tight text-left text-slate-800 text-center sm:leading-none text-3xl sm:text-8xl">
              <span className="inline md:block">Organize Yourself </span>
            </h1>
            <span className="font-bold relative mt-2 bg-clip-text text-slate-700 md:inline-block text-5xl">
              one{" "}
              <span className="text-emerald-400 inline-block underline underline-offset-8 decoration-emerald-300">
                Checkbox
              </span>{" "}
              at a Time
            </span>
          </div>

          <div className="max-w-lg px-4 pb-24 mx-auto text-left md:max-w-none md:text-center">
            <div className="text-center py-4 space-x-4">
              <button
                onClick={() => signIn()}
                className="backdrop-blur-sm transition duration-500 ease-in-out bg-slate-200 border border-[#E2E8F0] translate-y-1 text-[#16161d] hover:bg-neutral-200 text-lg font-semibold py-3 px-6 rounded-3xl inline-flex items-center"
              >
                <span> Get Started Now</span>
              </button>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Index;
