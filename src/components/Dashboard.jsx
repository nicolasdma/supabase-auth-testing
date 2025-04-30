import React from "react";
import { UserAuth } from "../context/ContextAuth";
import { useNavigate } from "react-router-dom";
import { FileInput, LogOut } from "lucide-react"; // Optional icon
import { supabase } from "../supabaseClient";

const Dashboard = () => {
  const { session, signOut } = UserAuth();

  const [priceUpdates, setPriceUpdates] = React.useState({});
  const [newOrder, setNewOrder] = React.useState({
    name: session?.user.name || "", // or fallback
    city: "",
  });

  console.log(session);
  const [orders, setOrders] = React.useState([]);
  const navigate = useNavigate();

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const fetchOrders = async () => {
    try {
      let { data: orders, error } = await supabase
        .from("orders")
        .select("id, name, city, address, price")
        .eq("client_id", session?.user.id);
      if (orders) {
        setOrders(orders);
      }
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };
  const createOrder = async () => {
    const orderData = {
      client_id: session?.user.id,
      name: newOrder.name,
      city: newOrder.city,
    };

    const { data, error } = await supabase
      .from("orders")
      .insert([orderData])
      .select();

    if (error) {
      console.error("Error creating order: ", error);
    } else {
      console.log("Order created: ", data);
      setNewOrder({ ...newOrder, city: "", address: "", price: "" }); // clear form
      fetchOrders();
    }
  };

  const updatePriceOrder = async (orderId) => {
    const newPrice = priceUpdates[orderId];
    console.log(session?.user.id);
    if (!newPrice) return;

    const { data, error } = await supabase
      .from("orders")
      .update({ price: newPrice })
      .eq("client_id", session?.user.id)
      .eq("id", orderId)
      .select();

    if (error) {
      console.error("Error updating order: ", error);
    } else {
      console.log("Order updated: ", data);
      fetchOrders();
    }
  };

  const deleteOrder = async (id) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .delete()
        .eq("id", id)
        .select();
      if (error) {
        console.error("Error deleting order: ", error);
      } else {
        console.log("Order deleted: ", data);
        fetchOrders();
      }
    } catch (error) {
      console.error("Error deleting order: ", error);
    }
  };

  React.useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/80 px-4">
      <div className="w-full max-w-md bg-black/70 text-white p-8 rounded-2xl shadow-md backdrop-blur-md text-center">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <h2 className="text-lg text-gray-300 mb-6">
          Welcome,{" "}
          <span className="text-white font-medium">{session?.user.email}</span>
        </h2>
        <div className="mb-6 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2 text-left">
            <input
              type="text"
              placeholder="Name"
              value={newOrder.name}
              onChange={(e) =>
                setNewOrder({ ...newOrder, name: e.target.value })
              }
              className="bg-black/40 text-white px-3 py-2 rounded-md border border-white/20"
            />
            <input
              type="text"
              placeholder="City"
              value={newOrder.city}
              onChange={(e) =>
                setNewOrder({ ...newOrder, city: e.target.value })
              }
              className="bg-black/40 text-white px-3 py-2 rounded-md border border-white/20"
            />
          </div>
          <button
            onClick={createOrder}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition"
          >
            Create Order <FileInput size={18} />
          </button>
        </div>
        <p className="text-gray-400 mb-4">Here are your recent orders.</p>
        {orders.length > 0 ? (
          <ul className="mb-6 grid gap-4 max-h-96 overflow-y-auto pr-2">
            {orders.map((order) => (
              <li
                key={order.id} // use order.id, not index
                className="bg-white/5 border border-white/10 rounded-xl p-4 text-left text-sm hover:bg-white/10 transition"
              >
                <div className="mb-1">
                  <span className="text-gray-400">Name:</span>{" "}
                  <span className="text-white font-medium">{order.name}</span>
                </div>
                <div className="mb-1">
                  <span className="text-gray-400">City:</span>{" "}
                  <span className="text-white">{order.city}</span>
                </div>
                <div className="mb-2">
                  <span className="text-gray-400">Price:</span>{" "}
                  <span className="text-white">{order.price ?? "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="New price"
                    className="bg-black/40 text-white px-3 py-1 rounded-md border border-white/20 w-24 text-sm"
                    value={priceUpdates[order.id] || ""}
                    onChange={(e) =>
                      setPriceUpdates((prev) => ({
                        ...prev,
                        [order.id]: e.target.value,
                      }))
                    }
                  />
                  <button
                    onClick={() => updatePriceOrder(order.id)}
                    className="text-xs px-3 py-1 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="text-xs px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No orders found.</p>
        )}

        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold transition"
        >
          <LogOut size={18} /> Sign out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
