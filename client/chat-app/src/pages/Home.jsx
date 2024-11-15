import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import AuthenticationService from "../Services/AuthenticationService";

function Home() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    let data = AuthenticationService.getDecryptedToken();
    console.log(data.id);
    let ignore = false;

    AuthenticationService.getActivity(data.id)
      .then((req) => {
        if (!ignore) {
          console.log(req.data);
          setActivities(req.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      {activities ? (
        <section className="mt-44 pl-6">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {activities &&
              activities.map(
                (
                  item // Added conditional check
                ) => (
                  <Card
                    key={item.id}
                    shadow={false}
                    className="relative grid h-[40rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
                  >
                    <CardHeader
                      floated={false}
                      shadow={false}
                      color="transparent"
                      className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center"
                    >
                      <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                    </CardHeader>
                    <CardBody className="relative py-14 px-6 md:px-12">
                      <Typography
                        variant="h2"
                        color="white"
                        className="mb-6 font-medium leading-[1.5]"
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="h5" className="mb-4 text-gray-400">
                        Tania Andrew
                      </Typography>
                      <Avatar
                        size="xl"
                        variant="circular"
                        alt="Tania Andrew"
                        className="border-2 border-white"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                      />
                    </CardBody>
                  </Card>
                )
              )}
          </div>
        </section>
      ) : (
        <div>no data found</div>
      )}
    </>
  );
}

export default Home;
