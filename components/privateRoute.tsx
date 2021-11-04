import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const PrivateRoute = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const [cookies] = useCookies(["user"]);
      const { user } = cookies;

      // If there is no access token we redirect to "/" page.
      if (!user) {
        Router.replace("/staff/login");
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props
      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};
export default PrivateRoute;
