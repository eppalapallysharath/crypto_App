import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "../Loader";
import axios from "axios";
import { apiUrl } from "../..";
import { useParams } from "react-router-dom";
import ErrorComponent from "../Errors/ErrorComponent";
import Chart from "../Chart";

const CoinDetails = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const params = useParams();
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStates = (val) => {
    switch (val) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("1y");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/coins/${params.id}`);
        const { data: chartData } = await axios.get(
          `${apiUrl}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setChartArray(chartData.prices);
        setCoin(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    };
    fetchCoin();
  }, [params.id, currency, days]);

  if (error) {
    return <ErrorComponent message={"Error while fetching data from server"} />;
  }

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box width={"full"} borderWidth={1}>
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </Box>

          <HStack p="4" overflowX={"auto"} justifyContent={"center"}>
            {btns.map((v) => (
              <Button key={v} onClick={() => switchChartStates(v)}>
                {v}
              </Button>
            ))}
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"} fontWeight={"bold"}>
              <Radio value={"inr"}>₹</Radio>
              <Radio value={"eur"}>€</Radio>
              <Radio value={"usd"}>$</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={0.7}>
              Last Updated on{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>
            <Image
              src={coin?.image?.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
            />
            <Stat>
              <StatLabel>{coin?.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin?.market_data?.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin?.market_data?.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin?.market_data?.price_change_percentage_24h}
              </StatHelpText>
            </Stat>
            <Badge fontSize={"2x1"}>{`#${coin?.market_cap_rank}`}</Badge>
            <CustomBar
              high={`${currencySymbol}${coin?.market_data?.high_24h[currency]}`}
              low={`${currencySymbol}${coin?.market_data?.low_24h[currency]}`}
            />
            <Box w={"full"}>
              <Item title={"Max Supply"} value={coin?.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coin?.market_data.circulating_supply}
              />
              <Item
                title={"Market Cap"}
                value={`${currencySymbol}${coin?.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All Time Low"}
                value={`${currencySymbol}${coin?.market_data.atl[currency]}`}
              />
              <Item
                title={"All Time High"}
                value={`${currencySymbol}${coin?.market_data.ath[currency]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const Item = ({ title, value }) => {
  return (
    <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
      <Text fontFamily={"bebas neue"} letterSpacing={"widest"}>
        {title}
      </Text>
      <Text>{value}</Text>
    </HStack>
  );
};

const CustomBar = ({ high, low }) => {
  return (
    <VStack w={"full"}>
      <Progress value={50} colorScheme={"teal"} w={"full"} />
      <HStack>
        <Badge children={low} colorScheme={"red"} />
        <Text fontSize={"sm"}>24H Range</Text>
        <Badge children={high} colorScheme={"green"} />
      </HStack>
    </VStack>
  );
};

export default CoinDetails;
