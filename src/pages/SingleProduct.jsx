import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Header from "../components/Header/Header";
import Typography from "@mui/material/Typography";

const SingleProduct = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          marginTop: "100px",
        }}
      >
        <Container>
          <Box
            sx={{
              maxWidth: "1080px",
              margin: "0 auto",
            }}
          >
            <img
              src="https://images.pexels.com/photos/3752194/pexels-photo-3752194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              style={{
                width: "100%",
                objectFit: "cover",
              }}
            />
          </Box>

          <Typography variant="h2" component="h2" sx={{ textAlign: "center" }}>
            Dummy Product Title
          </Typography>
          <Typography variant="p" component="p" sx={{ textAlign: "justify" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus aliquid delectus iure distinctio culpa voluptates
            rerum veritatis, aperiam quibusdam quas consectetur tempore ab
            dolore excepturi adipisci repellendus laborum eos velit. Corrupti
            tempore doloribus nihil rerum alias temporibus, magnam laborum
            delectus aliquam quas voluptates vitae veniam! Id doloremque
            nesciunt laborum nemo nobis amet sequi. Est, voluptatum velit
            assumenda sapiente inventore unde earum rem veritatis veniam debitis
            saepe cupiditate libero ratione architecto ipsa pariatur aliquid
            aspernatur rerum deserunt atque. Tenetur placeat possimus, expedita
            nisi tempora dolorem hic a dolores numquam aspernatur maxime
            accusamus repellendus laboriosam mollitia, neque nulla ipsum error
            laudantium corporis.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default SingleProduct;
