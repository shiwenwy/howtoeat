import { Fragment, useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Scrollbar } from "src/components/scrollbar";

export const MeunListTable = ({ summary, detail }) => {
  console.log("summary", summary);
  console.log("detail", detail);

  const handleProductDelete = useCallback(() => {
    toast.error('Product cannot be deleted');
  }, []);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          marginTop: 0,
        }}
      >
        <Container>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack direction="column" 
                justifyContent="space-between" 
                spacing={4}>
                <div>
                  <Typography variant="h6">我的菜单</Typography>
                </div>
                <div>
                  <Typography variant="text">{summary}</Typography>
                </div>
              </Stack>

            </Grid>
            <Grid xs={12}>
              <Scrollbar>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell width="20%">菜名</TableCell>
                      <TableCell width="20%">荤素</TableCell>
                      <TableCell width="20%">价格</TableCell>
                      <TableCell width="20%">份数</TableCell>
                      <TableCell width="20%" 
                        align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                        detail.map((meun) => {
                            return (
                                <Fragment key={meun.name}>
                                    <TableRow
                                        hover
                                        key={meun.name}
                                    >
                                        <TableCell>
                                            { meun.name }
                                        </TableCell>
                                        <TableCell>
                                            { meun.meat }
                                        </TableCell>
                                        <TableCell>
                                            { meun.price + '元' }
                                        </TableCell>
                                        <TableCell>
                                            { meun.num }
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={handleProductDelete}
                                                color="error"
                                                >
                                                删除
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    
                                </Fragment>
                            )
                        })
                    }
                  </TableBody>
                </Table>
              </Scrollbar>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
