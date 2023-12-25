import React from "react";

const Index = ({ signIn }) => {
  return (
    <div>
      <section>
        <section className="sticky">
          <div className="max-w-lg px-4 sm:pt-24 pt-12 sm:pb-8 mx-auto text-left md:max-w-none md:text-center">
            <div className="text-center py-4 mb-12 hidden sm:block">
              <button className="bg-sky-500 hover:bg-neutral-200 text-white text-md font-bold py-2.5 px-4 rounded-full inline-flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#ffffff"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
                &nbsp; &nbsp;<span> Follow me on Twitter </span>
              </button>
            </div>

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
                <span> Get Started Now.</span>
              </button>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Index;
