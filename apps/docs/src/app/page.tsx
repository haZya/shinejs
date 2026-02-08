export default function HomePage() {
  return (
    <>
      <head>
        <meta httpEquiv="refresh" content="0;url=docs/" />
      </head>
      <main className="flex min-h-screen items-center justify-center p-6 text-center">
        <p>
          Redirecting to the docs... If it does not happen automatically, continue to
          {" "}
          <a href="docs/" className="underline underline-offset-4">
            /docs
          </a>
          .
        </p>
      </main>
    </>
  );
}
