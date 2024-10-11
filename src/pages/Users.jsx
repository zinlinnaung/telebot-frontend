import {

    Paper,
    
  } from "@mui/material";

  
  const Users = () => {
    
  
    return (
      <Paper
        sx={{
          flex: 1,
          overflow: "auto",
          p: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Card
          elevation={3}
          component="form"
          onSubmit={onSubmitHandler}
          sx={{
            width: "50%",
            textAlign: "center",
            px: "2rem",
            py: "1rem",
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: "2rem", fontWeight: "bold", mb: "1rem" }}>
              Change Your Password
            </Typography>
            <Typography sx={{ mb: "1rem" }}>
              Enter a new password below to change your password
            </Typography>
            <TextField
              name="currentPassword"
              type="password"
              label="Current Password"
              fullWidth
              size="small"
              required
              sx={{ mb: "1rem" }}
              value={form.currentPassword}
              onChange={onChangeHandler}
            />
            <TextField
              name="newPassword"
              type="password"
              label="New Password"
              fullWidth
              size="small"
              required
              sx={{ mb: "1rem" }}
              value={form.newPassword}
              onChange={onChangeHandler}
            />
            <TextField
              name="confirmPassword"
              type="password"
              label="Confirm Your Password"
              fullWidth
              size="small"
              required
              sx={{ mb: "1rem" }}
              value={form.confirmPassword}
              onChange={onChangeHandler}
            />
            <Typography
              sx={{
                color: "secondary.main",
                textAlign: "left",
              }}
            >
              {error && error}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              sx={{
                mx: "auto",
                backgroundColor: "primary.main",
                color: "white",
                ":hover": {
                  backgroundColor: "primary.hover",
                },
              }}
            >
              Change Password
            </Button>
          </CardActions>
        </Card> */}
      </Paper>
    );
  };
  
  export default Users;
  