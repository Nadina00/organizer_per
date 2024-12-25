import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import currencyOperations from "../../redux/currency/currency-operations";
import { currencyList } from "../../redux/currency/currency-select";
import styles from "./Currency.module.css";

export const Currency = () => {
  const dispatch = useDispatch();
  const currency = useSelector(currencyList);

  const USD = 1 / currency.USD;
  const EUR = 1 / currency.EUR;

  useEffect(() => {
    dispatch(currencyOperations.currencyList());
  }, [dispatch]);

  return (
    <div className={styles.currencyContainer}>
      <h2 className={styles.title}>Exchange rates</h2>
      <p className={styles.exchangeRate}>
        <span className={styles.rateLabel}>USD:</span> {USD.toFixed(2) || "0"} UAH
      </p>
      <p className={styles.exchangeRate}>
        <span className={styles.rateLabel}>EUR:</span> {EUR.toFixed(2) || "0"}  UAH
      </p>
    </div>
  );
};
