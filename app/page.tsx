import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import {
  ArrowRightIcon,
  UploadIcon,
  GithubIcon,
  TableDataIcon,
  PerformanceIcon,
  ExtensibleIcon,
  TableIcon,
  TableEditIcon,
  FileUploadIcon,
} from "./components/icons";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Next Viz Kit</h1>

          <div className={styles.taglineContainer}>
            <p className={styles.poweredBy}>Built with</p>
            <Image
              className={styles.nextLogo}
              src="/next.svg"
              alt="Next.js logo"
              width={80}
              height={20}
              priority
            />
          </div>

          <p className={styles.subtitle}>
            An open-source, feature-rich React dashboard library for complex
            data visualization needs
          </p>

          <div className={styles.ctas}>
            <Link href="/table-demo" className={styles.primaryButton}>
              <span>View Table Demo</span>
              <ArrowRightIcon />
            </Link>

            <Link href="/file-upload-demo" className={styles.secondaryButton}>
              <UploadIcon />
              <span>Convert Your Excel/CSV to Table Demo</span>
            </Link>

            <a
              href="https://github.com/ujjwal502/next-viz-kit"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryButton}
            >
              <GithubIcon />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>

        <div className={styles.featuresSection}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <TableDataIcon />
            </div>
            <h3>Data Tables</h3>
            <p>
              Feature-rich tables with sorting, filtering, editing,
              virtualization and much more
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <PerformanceIcon />
            </div>
            <h3>Performant</h3>
            <p>Optimized for handling large datasets with virtualization</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <ExtensibleIcon />
            </div>
            <h3>Extensible</h3>
            <p>Built with flexible components that are easy to customize</p>
          </div>
        </div>

        <div className={styles.getStarted}>
          <h2>Getting Started</h2>
          <div className={styles.codeBlock}>
            <ol>
              <li>
                <strong>Clone the repository:</strong>{" "}
                <code>
                  git clone https://github.com/ujjwal502/next-viz-kit.git
                </code>
              </li>
              <li>
                <strong>Install dependencies:</strong> <code>npm install</code>
              </li>
              <li>
                <strong>Explore the demos:</strong>{" "}
                <Link href="/table-demo" className={styles.inlineLink}>
                  <code>/table-demo</code>
                </Link>
                ,{" "}
                <Link href="/table-editing-demo" className={styles.inlineLink}>
                  <code>/table-editing-demo</code>
                </Link>
                , and{" "}
                <Link href="/file-upload-demo" className={styles.inlineLink}>
                  <code>/file-upload-demo</code>
                </Link>
              </li>
              <li>
                <strong>Study the source code:</strong>{" "}
                <code>app/components/Table</code> directory contains all table
                components
              </li>
              <li>
                <strong>Use components in your project:</strong> Copy components
                and follow the{" "}
                <a
                  href="https://github.com/ujjwal502/next-viz-kit#using-the-code"
                  className={styles.inlineLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  usage guide
                </a>
              </li>
            </ol>
          </div>
        </div>

        <div className={styles.demoCardsContainer}>
          <Link href="/table-demo" className={styles.demoCard}>
            <div className={styles.demoCardIcon}>
              <TableIcon />
            </div>
            <h3 className={styles.demoCardTitle}>Table Demo →</h3>
            <p className={styles.demoCardDescription}>
              Explore basic and virtual table examples with sorting, filtering,
              and exporting capabilities.
            </p>
          </Link>

          <Link href="/table-editing-demo" className={styles.demoCard}>
            <div className={styles.demoCardIcon}>
              <TableEditIcon />
            </div>
            <h3 className={styles.demoCardTitle}>Table Editing Demo →</h3>
            <p className={styles.demoCardDescription}>
              Explore editable tables with cell editing functionality.
            </p>
          </Link>

          <Link href="/file-upload-demo" className={styles.demoCard}>
            <div className={styles.demoCardIcon}>
              <FileUploadIcon />
            </div>
            <h3 className={styles.demoCardTitle}>
              Convert Excel/CSV to Table →
            </h3>
            <p className={styles.demoCardDescription}>
              Upload your spreadsheets and instantly convert them into
              interactive, sortable tables.
            </p>
          </Link>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} Next Viz Kit
          </div>
        </div>
      </footer>
    </div>
  );
}
