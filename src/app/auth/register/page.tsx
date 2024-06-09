"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import Image from "next/image";
import wave from "@/../public/wave.svg";
import bankIcon from "@/../public/bank-icon.png";

type Props = {};
type LoginInput = {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
};

export default function Register(props: Props) {
    const [inputs, setInputs] = useState<LoginInput>({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const { toast } = useToast();
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs),
        });
        if (response.ok) {
            toast({
                title: "User created",
                description: "User has been created successfully",
            });
            await signIn("credentials", {
                email: inputs.email,
                password: inputs.password,
                callbackUrl: "/",
            });
        } else {
            toast({
                title: "Error",
                description: "An error occurred trying to create the user",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white p-8">
                <div className="w-full max-w-sm">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">
                        Opret Dig
                    </h1>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="first_name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Fornavn
                            </label>
                            <div className="mt-1">
                                <input
                                    id="first_name"
                                    name="first_name"
                                    type="text"
                                    autoComplete="off"
                                    required
                                    value={inputs.first_name || ""}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="last_name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Efternavn
                            </label>
                            <div className="mt-1">
                                <input
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    autoComplete="off"
                                    required
                                    value={inputs.last_name || ""}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    autoComplete="off"
                                    required
                                    value={inputs.email || ""}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Adgangskode
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="off"
                                    required
                                    value={inputs.password || ""}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-white focus:ring-indigo-500 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-300 hover:to-blue-400"
                            >
                                Tilmeld
                            </button>
                        </div>
                    </form>
                    <div className="mt-6 flex items-center justify-center">
                        <p className="text-gray-600 mr-2">
                            Har du allerede en konto?
                        </p>
                        <Link
                            href="/auth/signin"
                            className="font-medium text-indigo-600 hover:text-indigo-500 underline"
                        >
                            Log Ind
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white items-center justify-center">
                <div className="text-center px-4">
                    <Image
                        src={bankIcon}
                        alt="Finance"
                        width={100}
                        height={60}
                        className="mx-auto mb-4"
                    />
                    <h2 className="text-2xl font-bold">
                        Samlet økonomi, samlet overblik.
                    </h2>
                </div>
            </div>
            <div className="absolute -bottom-6 w-full">
                <Image src={wave} alt="Wave SVG" layout="responsive" />
            </div>
        </div>
    );
}
