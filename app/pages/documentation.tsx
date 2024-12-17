import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';

export default function Documentation() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Enterprise Logos Section */}
        <div className="flex justify-center items-center gap-8 mb-12">
          <Image src="/images/logos/paramount.png" alt="Paramount" width={120} height={40} />
          <Image src="/images/logos/columbia.png" alt="Columbia University" width={120} height={40} />
          <Image src="/images/logos/evidation.png" alt="Evidation" width={120} height={40} />
          <Image src="/images/logos/disney.png" alt="Disney Parks and Resort" width={120} height={40} />
          <Image src="/images/logos/harvard.png" alt="Harvard University" width={120} height={40} />
        </div>

        {/* Secure Your Apps Section */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold mb-4">Secure Your Apps</h1>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xl text-gray-600 mb-8">
                Add enterprise-grade authentication with one click. No need to modify your app's source code.
              </p>
              <div className="flex gap-4">
                <Link 
                  href="https://www.platform.ploomber.io/register"
                  className="bg-[#FFD666] text-black px-6 py-3 rounded-md hover:bg-[#FFD666]/90 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  href="https://docs.cloud.ploomber.io/en/latest/quickstart/app.html"
                  className="bg-gray-100 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Read Docs
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <Image
                src="/images/auth-preview.png"
                alt="Authentication Preview"
                width={500}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Bring Your Domain Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-4">Bring Your Domain</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xl text-gray-600 mb-8">
                Serve your apps from your own domain. Configure DNS records and SSL certificates with ease.
              </p>
              <div className="flex gap-4">
                <Link 
                  href="https://www.platform.ploomber.io/register"
                  className="bg-[#FFD666] text-black px-6 py-3 rounded-md hover:bg-[#FFD666]/90 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  href="https://docs.cloud.ploomber.io/en/latest/domains.html"
                  className="bg-gray-100 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Read Docs
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <Image
                src="/images/domain-preview.png"
                alt="Domain Configuration Preview"
                width={500}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Python Integration Guide Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Python Integration Guide</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Docker Setup</h3>
              <p className="mb-4">
                Use Docker to containerize your Python applications. Here's a basic Dockerfile setup:
              </p>
              <pre className="bg-gray-100 p-4 rounded mb-4">
                <code>
                  {`FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "main.py"]`}
                </code>
              </pre>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">CLI Tools</h3>
              <p className="mb-4">
                Create command-line tools using Python's argparse module:
              </p>
              <pre className="bg-gray-100 p-4 rounded mb-4">
                <code>
                  {`import argparse
import docker

def run_container(image, command):
    client = docker.from_env()
    result = client.containers.run(image, command)
    print(result.decode())

def main():
    parser = argparse.ArgumentParser(description="Run a command in a Docker container")
    parser.add_argument("image", type=str, help="Docker image to use")
    parser.add_argument("command", type=str, help="Command to run inside the container")
    args = parser.parse_args()

    run_container(args.image, args.command)

if __name__ == "__main__":
    main()`}
                </code>
              </pre>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Environment Management</h3>
              <p className="mb-4">
                Use virtual environments to manage dependencies:
              </p>
              <pre className="bg-gray-100 p-4 rounded mb-4">
                <code>
                  {`# Create a virtual environment
python -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt`}
                </code>
              </pre>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
} 