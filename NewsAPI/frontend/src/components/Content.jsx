import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Content() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("http://localhost:3005/api");

        if (!response.ok) {
          setError(true);
          console.log("invalid response");
        } else {
          const response_data = await response.json();
          setData(response_data);
          console.log(response_data);
        }
      } catch (err) {
        setError(true);
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <AiOutlineLoading3Quarters className="text-6xl animate-spin text-blue-500" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen flex-col gap-4">
        <MdErrorOutline className="text-8xl text-red-500" />
        <h1 className="text-2xl text-red-500 font-semibold">Error in fetching data</h1>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data && data.map((news, idx) => (
          <Card
            key={idx}
            className={`flex flex-col h-full hover:shadow-lg transition-shadow ${
              idx === 3 || idx === 9? "row-span-1 lg:col-span-2 lg:row-span-2" : ""
            }`}
          >
            <CardHeader>
              <CardTitle className="text-lg font-bold line-clamp-2">{news.title}</CardTitle>
              <CardDescription className="line-clamp-3">{news.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <img
                src={news.urlToImage}
                alt={news.title}
                className="w-full h-full object-cover rounded-md"
              />
            </CardContent>
            <CardFooter className="text-sm text-gray-500">
              <p>{new Date(news.publishedAt).toLocaleDateString()}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Content;