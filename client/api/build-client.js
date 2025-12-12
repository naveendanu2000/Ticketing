import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    //we are on the server
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local:80",
      headers: req.headers,
    });
  } else {
    //we are on the browser
    return axios.create({
      baseURL: "/",
    });
  }
};
