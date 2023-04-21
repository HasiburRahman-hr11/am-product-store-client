import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Header from "../components/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import LoadingBox from "../components/Loading/LoadingBox";
import convertToBase64 from "../utils/convertToBase64";
import { UserContext } from "../context/user-context/userContext";
import { logoutSuccess } from "../context/user-context/userAction";
import { errorNotify, successNotify } from "../utils/toastify";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user: localUser, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const deleteUser = async (userId) => {
    if (window.confirm("Delete this user?")) {

      try {
        const { data } = await axios.delete(
          `http://localhost:8080/admin/user/delete-user/${userId}`
        );
        if (data) {
          if (userId === localUser._id) {
            localStorage.removeItem("am-store-user");
            dispatch(logoutSuccess());
            navigate("/");
          }
          setUsers(users.filter((user) => user._id !== userId));
          successNotify("User deleted successfully.");
        }
      } catch (error) {
        console.log(error);
        errorNotify("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/admin/user/all-users"
        );
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getAllUsers();
  }, []);
  return (
    <>
      <Header />
      {loading ? (
        <LoadingBox />
      ) : (
        <Box
          sx={{
            minHeight: "100vh",
            marginTop: "100px",
          }}
        >
          <Container>
            <Grid container sx={{ width: "100%" }} spacing={4}>
              {users.map((user) => (
                <Grid key={user._id} item key={user._id} xs={12} sm={6} md={4}>
                  <Box
                    component="div"
                    sx={{
                      padding: "20px 20px",
                      background: "#fff",
                      borderRadius: "8px",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "90px",
                        height: "90px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        margin: "0 auto 25px auto",
                      }}
                    >
                      {user?.profilePicture ? (
                        <img
                          src={`data:image/png;base64,${convertToBase64(
                            user?.profilePicture.data
                          )}`}
                          alt={user.firstName}
                          style={{
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <img
                          src={`https://eu.ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&size=250`}
                          alt=""
                        />
                      )}
                    </Box>

                    <Typography
                      variant="h5"
                      component="h6"
                      sx={{ padding: "15px 0", textAlign: "center" }}
                    >
                      {user.firstName + " " + user.lastName}
                    </Typography>
                    <Typography variant="p" component="p" sx={{ mb: "10px" }}>
                      {user.email}
                    </Typography>
                    <Typography variant="p" component="p">
                      Role: {user.isAdmin ? "Admin" : "Subscriber"}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        mt: "30px",
                      }}
                    >
                      <Link to={`/admin/edit-user/${user._id}`}>
                        <Button
                          sx={{
                            backgroundColor: "#9c27b0",
                            color: "#fff",
                            padding: "6px 10px",
                            "&:hover": {
                              backgroundColor: "#7B1FA2",
                            },
                          }}
                        >
                          Edit User
                        </Button>
                      </Link>
                      <Button
                        onClick={() => deleteUser(user._id)}
                        variant="contained"
                      >
                        Delete User
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
};

export default AllUsers;
