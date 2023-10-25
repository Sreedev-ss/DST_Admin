import axios from "axios";
import { useEffect } from "react";

/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
export const reportsLineChartData = (
  investmentByDay,
  investmentByMonth,
  investmentByYear,
  revenueByDay,
  revenueByMonth,
  revenueByYear,
  profitandLossBySport
) => {
  const days = [];
  const totalInvestmentDay = [];
  const year = [];
  const totalInvestmentYear = [];
  const totalRevenueDay = [];
  const totalRevnueYear = [];
  const sport = [];
  const sportRevenue = [];
  investmentByDay.forEach((item) => {
    days.push(item.day);
    totalInvestmentDay.push(item.totalInvestment);
  });
  investmentByYear.forEach((item) => {
    year.push(item.year);
    totalInvestmentYear.push(item.totalInvestment);
  });
  revenueByDay.forEach((item) => {
    totalRevenueDay.push(item.totalRevenue);
  });
  revenueByYear.forEach((item) => {
    totalRevnueYear.push(item.totalRevenue);
  });
  profitandLossBySport.forEach((item) => {
    sport.push(item.sportName);
    sportRevenue.push(item.revenue);
  });
  return {
    dailyInvestment: {
      labels: days,
      datasets: { label: "Daily Investment", data: totalInvestmentDay },
    },
    monthlyInvestment: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: {
        label: "Monthly Investment",
        data: investmentByMonth,
      },
    },
    yearlyInvestment: {
      labels: year,
      datasets: { label: "Yearly Investment", data: totalInvestmentYear },
    },
    dailyRevenue: {
      labels: days,
      datasets: { label: "Daily Revenue", data: totalRevenueDay },
    },
    monthlyRevenue: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: {
        label: "Monthly Revenue",
        data: revenueByMonth,
      },
    },
    yearlyRevenue: {
      labels: year,
      datasets: { label: "Yearly Revenue", data: totalRevnueYear },
    },

    profitLossBySport: {
      labels: sport,
      datasets: [
        {
          label: "Sport P/L",
          data: sportRevenue,
        },
      ],
    },
  };
};
