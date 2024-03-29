/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
  Avatar,
} from "@mui/material";
import { styled } from '@mui/system';
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import { deepOrange } from "@mui/material/colors";
import { FlexBetween } from "../styledComponents/styledComponents";

import { useDispatch } from "react-redux";
import { setMode } from "../../redux/features/theme/themeSlice";
import { useSendLogoutMutation } from "../../redux/features/auth/authApiSlice";
import { useGetEmployeeProfileQuery } from "../../redux/features/employee/employeeApiSlice";
import useAuth from "../../hooks/useAuth";

const CustomAppBar = styled(AppBar)({
  boxShadow: 'none', 
});

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [sendLogout, { isSuccess }] = useSendLogoutMutation();
  const { data, isLoading } = useGetEmployeeProfileQuery();
  let firstname = data?.data.profile.firstName;

  const { email, role } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    if (isSuccess) navigate("/login");
  }, [isSuccess, navigate]);

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <CustomAppBar
      sx={{
        position: "static",
        background: theme.palette.background.alt,
      }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.default}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem">
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}>
              <Avatar sx={{ bgcolor: deepOrange[500] }}>{!isLoading ? firstname.charAt(0) : null}</Avatar>
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.neutral.dark }}>
                  {email}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.neutral.main }}>
                  {role}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.neutral.dark, fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              disableScrollLock={true}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
              <MenuItem onClick={sendLogout}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Navbar;
