import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Home = () => {
  const loggedIn = { firstName: "Daniel", lastName: "Hernandez", email: "danielhernandez@uchicago.edu"};

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          {/* Components have their own params called props  */}
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={2}
            totalCurrentBalance={1250.35}
          />
        </header>
        RECENT TRANSACTIONS
      </div>

      <RightSidebar user={loggedIn} transactions={[]} banks={[{ currentBalance : 800.10 },{ currentBalance : 500.69}]} />
    </section>
  );
};

export default Home;
