import { Button, Container, Table } from "react-bootstrap";

import AppUserBoard from "../app.user.board";
import AppFooter from "../../Footer/app.footer";
import NavBar from "../../NavBar/app.navbar";
import InformationUser from "./user.inforUser";
import "./user.history.css";
import { useEffect, useState } from "react";
import { useUser } from "../../../UseContext/UserContext";
import { Link, useNavigate } from "react-router";
const UserDashboard = () => {
  const [dataOrder, setDataOrder] = useState([]);
  const [show, setShow] = useState(false);
  const { userInfo } = useUser();
  const userId = userInfo._id;
  const navigate = useNavigate();

  // Fetch user order history
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DATABASE_URL}/api/client/orders/${userId}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch order history");
        }
        const data = await response.json();
        console.log("Order history data:", data);
        setDataOrder(data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    fetchOrderHistory();
  }, [userId]);

  const orderHistory = show ? dataOrder : dataOrder.slice(0, 5);

  return (
    <>
      <Container>
        <NavBar />
      </Container>
      <div>
        <img
          src="../../../public/Image/Login/Breadcrumbs (1).png"
          alt="Logo"
        ></img>
      </div>
      <Container className="user-history-container">
        <AppUserBoard />
        <div>
          <div>
            <InformationUser />
          </div>
          <div>
            <div className="user-history-title">
              <div className="user-history-title-text">
                Recent Order History
              </div>
              <div>
                <Button onClick={() => setShow(!show)}>
                  {show ? "Show Less" : "Show More"}
                </Button>
              </div>
            </div>
            <Table striped bordered hover>
              <thead>
                {orderHistory.length > 0 ? (
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                ) : (
                  <tr>
                    <th colSpan="3">No order history available</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {orderHistory.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>{order.totalAmount || "No total available"}</td>
                    <td>{order.status}</td>
                    <td>
                      <Button
                        onClick={() =>
                          navigate(`/user/order-history/${order._id}`)
                        }
                        variant="primary"
                      >
                        View Order
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
      <AppFooter />
    </>
  );
};

export default UserDashboard;
