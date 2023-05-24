import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../..";
import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import Loader from "../Loader";
import ErrorComponent from "../Errors/ErrorComponent";
import CoinsCard from "./CoinCard";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const btns = new Array(132).fill(1);

  const fetchCoins = async (currency, page) => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/coins/markets?vs_currency=${currency}&page=${page}`
      );
      console.log(data);
      setCoins(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchCoins(currency, page);
  }, [currency, page]);

  if (error) {
    return <ErrorComponent message={"Error while fetching data from server"} />;
  }

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"} justifyContent={"center"} fontWeight={"bold"}>
              <Radio value={"inr"}>₹</Radio>
              <Radio value={"eur"}>€</Radio>
              <Radio value={"usd"}>$</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((v) => (
              <CoinsCard
                key={v.id}
                id={v.id}
                name={v.name}
                img={v.image}
                symbol={v.symbol}
                price={v.current_price}
                currency={v.currency}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack w={"full"} overflowX={"auto"} p={"8"}>
            {btns.map((value, index) => (
              <Button
                key={index + 1}
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
