import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <h1 style={{ marginTop: "20px" }}>Next Viz Kit</h1>
        <p>
          An open-source, feature-rich React dashboard library for complex data
          visualization needs
        </p>

        <div className={styles.ctas} style={{ marginTop: "20px" }}>
          <Link href="/table-demo" className={styles.primary}>
            View Table Demo
          </Link>

          <a
            href="https://github.com/ujjwal502/next-viz-kit"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            GitHub Repository
          </a>
        </div>

        <ol style={{ marginTop: "30px" }}>
          <li>
            We&apos;ve created a table component demo at{" "}
            <code>/table-demo</code>
          </li>
          <li>
            View the source code in <code>app/components/Table</code>
          </li>
        </ol>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
