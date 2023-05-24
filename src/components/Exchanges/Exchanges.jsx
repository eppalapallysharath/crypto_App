import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../..";
import { Container, HStack } from "@chakra-ui/react";
import Loader from "../Loader";
import ExchangeCard from "./ExchangeCard";
import ErrorComponent from "../Errors/ErrorComponent";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchExchanges = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/exchanges?per_page=250`);
      console.log(data);
      setExchanges(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchExchanges();
  }, []);

  if (error) {
    return <ErrorComponent message={"Error while fetching data from server"} />;
  }

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((v) => (
              <ExchangeCard
                key={v.id}
                name={v.name}
                img={v.image}
                rank={v.trust_score_rank}
                url={v.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Exchanges;
