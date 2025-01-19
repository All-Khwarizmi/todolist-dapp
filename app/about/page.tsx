import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Twitter } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">About Web3 TodoList DApp</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Meet the Developer</CardTitle>
            <CardDescription>Jason Suarez</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg" alt="Jason Suarez" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div>
              <p className="mb-2">
                Passionate about Web3 and building decentralized applications
                that make a difference.
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://twitter.com/swarecito"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://github.com/All-Khwarizmi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technical Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge>Next.js 14</Badge>
              <Badge>TypeScript</Badge>
              <Badge>Ethers.js</Badge>
              <Badge>TanStack Query</Badge>
              <Badge>Zustand</Badge>
              <Badge>shadcn/ui</Badge>
              <Badge>Clean Architecture</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We're building a modern, decentralized todo list application that
              leverages the power of blockchain technology. Our goal is to
              create a user-friendly DApp that showcases the potential of Web3
              technologies in everyday applications.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Smart contract integration for todo management</li>
              <li>Modern wallet support with EIP-6963 compliance</li>
              <li>Clean architecture for maintainable and scalable code</li>
              <li>Real-time blockchain state updates</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Our Approach</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We believe in building in public and sharing our journey. Our
              development process focuses on:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Transparency in decision-making and development progress</li>
              <li>Embracing modern Web3 standards and best practices</li>
              <li>Community engagement and feedback incorporation</li>
              <li>Continuous learning and improvement</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
