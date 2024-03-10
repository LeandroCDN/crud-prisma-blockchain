"use client";
import Home from "../page";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect } from "react";

const Ref = () => {
  const router = useRouter();
  const { refID } = router.query;

  useEffect(() => {
    if (refID) {
      const refIDString = Array.isArray(refID) ? refID[0] : refID;
      // Guarda el refID en una cookie con una duración de 7 días (ajusta según tus necesidades)
      Cookies.set("refID", refIDString, { expires: 7 });
    }
  }, [refID, router]);

  return <Home />;
};

export default Ref;
