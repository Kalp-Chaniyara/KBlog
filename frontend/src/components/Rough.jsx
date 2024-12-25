import {
     Card,
     CardHeader,
     CardBody,
     CardFooter,
     Typography,
} from "@material-tailwind/react";

export function Rough({ title, categoryOfPost, summary, author, image }) {
     return (
          <Card className="mt-6 w-96  hover:border-red-700 hover:border-8 ">
               <CardHeader color="blue-gray" className="relative h-56">
                    <img
                         src={image}
                         alt={title}
                    />
               </CardHeader>
               <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                         {title}
                    </Typography>
                    <Typography>
                         {summary}
                    </Typography>
               </CardBody>
               <CardFooter className="pt-0 flex items-center justify-between">
                    <Typography>
                         {categoryOfPost}
                    </Typography>
                    <Typography>
                         {author}
                    </Typography>
               </CardFooter>
          </Card>
     );
}