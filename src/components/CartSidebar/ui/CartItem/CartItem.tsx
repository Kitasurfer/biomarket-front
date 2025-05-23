import { Delete as DeleteIcon } from "@mui/icons-material";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { useCallback } from "react";
import { useAppDispatch } from "store/hooks";
import { cartActions } from "store/redux/cart/slice/cartSlice";
import { snackbarActions } from "store/redux/ui/slice/snackbarSlice";
import { CartItemProps } from "./types";

function CartItem({ value }: CartItemProps) {
  const dispatch = useAppDispatch();
  const currencySymbol = "€";

  const handleRemove = useCallback(async () => {
    try {
      await dispatch(
        cartActions.fetchRemoveProductFromCart({ productId: value.productId })
      ).unwrap();

      dispatch(
        snackbarActions.enqueueSnackbar({
          message: "Товар удален из корзины",
          severity: "success"
        })
      );
    } catch (error) {
      console.error("Ошибка при добавлении в корзину:", error);
    }
  }, [dispatch, value]);

  return (
    <Grid container direction="row" spacing={2}>
      <img
        width={50}
        height={50}
        src={value.image}
        style={{
          borderRadius: "5px"
        }}
      />
      <Box
        sx={{
          flexGrow: 1,
          padding: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: "20px"
        }}
      >
        <Box sx={{ flexGrow: 1, padding: 0 }}>
          <Typography>{value.title}</Typography>
          <Typography
            sx={{
              gap: "5px",
              display: "flex",
              alignItems: "center"
            }}
          >
            <ins
              style={{
                textDecoration: "none"
              }}
            >
              <bdi
                style={{
                  color: "#777",
                  fontSize: "14px",
                  fontWeight: "300"
                }}
              >
                <span>{currencySymbol}</span>
                <span>{value.totalItemPrice}</span>
              </bdi>
            </ins>
            <span
              style={{
                color: "#777",
                fontSize: "14px",
                fontWeight: "300"
              }}
            >
              (<span>{value.quantity}</span> <span>{value.unitOfMeasure}</span>)
            </span>
          </Typography>
        </Box>

        <Tooltip title="Remove from cart">
          <IconButton
            onClick={handleRemove}
            sx={{
              opacity: ".25",
              "&:hover": {
                color: "error.main",
                opacity: "1"
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Grid>
  );
}

export default CartItem;
