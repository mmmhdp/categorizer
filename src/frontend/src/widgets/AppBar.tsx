import { Box, IconButton, useMediaQuery } from "@mui/material";
import Logo from "../ui/Logo";
import menu_icon from "../assets/menu_icon.svg";
import LogoutIcon from "@mui/icons-material/Logout";

export default function AppBar() {
    const isMobile = useMediaQuery("(max-width:900px)");

    return (
        <>
            <Box >
                <Box
                    sx={{
                        height: "60px",
                        p: 1,
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                    className="container-main"
                >
                    <Logo />
                    <Box
                        sx={{
                            width: "calc(100% - 310px)",
                            backgroundColor: "white",
                            height: "90%",
                            borderRadius: "24.5px",
                            display: "flex",
                            justifyContent: !isMobile
                                ? "space-between"
                                : "flex-end",
                            alignItems: "center",
                            flexWrap: "nowrap",
                            marginTop: 0.5,
                        }}
                    >
                        {!isMobile && (
                            <Box sx={{ ml: 5, display: "flex" }}>
                                <img
                                    src={menu_icon}
                                    width="20px"
                                    height="20px"
                                />
                            </Box>
                        )}
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2, zIndex: 2 }}
                            onClick={() => {
                                window.location.reload();
                            }}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
