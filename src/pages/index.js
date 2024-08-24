import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useCallback, useState, useRef, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FileDropzone } from "src/components/file-dropzone";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import { cosUpload } from 'src/utils/cos'
import { getMeun } from 'src/utils/get-meun'
import { MeunListTable } from 'src/sections/eat/meun-list-table'


// 自定义Button样式
const StyledButton = styled(Button)(({ theme }) => ({
  color: 'black',
  backgroundColor: 'gray',
  '&:hover': {
    backgroundColor: '#faaf00',
    color: "white",
  },
  '&.active': {
    backgroundColor: '#faaf00',
    color: 'white',
  },
}));

const marks = [
  {
    value: 0,
    label: '￥0',
  },
  {
    value: 100,
    label: '￥100+',
  },
];


const Page = () => {

  const meatSliderRef = useRef(null);
  const consumeSliderRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [finalResult, setFinalResult] = useState(null);

  const handleCoverDrop = useCallback(async ([file]) => {
    
    const uploadResult = await cosUpload(file.name, file);
    if (uploadResult.err) {
      console.log('上传出错', uploadResult.err);
    } else {

      setFiles(prevFiles => 
        [
          ...prevFiles,
          'http://'+uploadResult.data.Location
        ]);
    }
  }, []);

  const handleCoverRemove = (file) => {
    setFiles(prevFiles => prevFiles.filter(f => f !== file));
  };

  const [meatSliderValue, setMeatSliderValue] = useState(0);
  const [consumeSliderValue, setConsumeSliderValue] = useState(0);

  const [meat, setMeat] = useState(0);
  const [vegetable, setVegetable] = useState(100);
  

    // 状态管理：跟踪被选中的人数按钮
    const [peopleNum, setPeopleNum] = useState(null);

    // 状态管理：跟踪被选中的份量按钮
    const [weight, setWeight] = useState(null);

    const [diet, setDiet] = useState(null);

    const handlePeopleNumClick = (value) => {
      setPeopleNum(value);
    };
    
    const handleWeightClick = (value) => {
      setWeight(value);
    };

    const handleDietClick = (value) => {
      setDiet(value);
    };

    const handleMeatSliderChange = (event, newValue) => {
      setMeatSliderValue(newValue);
    };
    useEffect(() => {
      setMeat(meatSliderValue);
      setVegetable(100-meatSliderValue)
    }, [meatSliderValue]);

    const handleConsumeSliderChange = (event, newValue) => {
      setConsumeSliderValue(newValue);
    };

    const generateMeun = async (event) => {
      event.preventDefault();
      if(!finalResult) {
        await getMeun(files, peopleNum, weight, meat, vegetable, consumeSliderValue, diet, setFinalResult);
      }
    }

  if(finalResult) {
    console.log('finalResult',finalResult);
    const result = JSON.parse(finalResult);
  
    console.log('result',result);
    return (
      <>
        <MeunListTable 
          summary={result.summary} 
          detail={result.detail} />
      </>
    )
  }

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
              <Stack direction="row" 
                justifyContent="space-between" 
                spacing={4}>
                <div>
                  <Typography variant="h4">一键点餐</Typography>
                </div>
              </Stack>
            </Grid>
          </Grid>
          <Grid xs={12} 
            md={8}>
            <Stack>
              <FileDropzone
                accept={{ "image/*" : [] }}
                maxFiles={3}
                onDrop={handleCoverDrop}
                onRemove={handleCoverRemove}
                caption="JPG, PNG"
                files={files}
              />
            </Stack>
          </Grid>
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Grid container 
                direction="column" 
                spacing={3}>
                <Grid xs={12} 
                  md={4}>
                  <Typography variant="h6">人数</Typography>
                </Grid>
                <Grid container 
                direction="row"
                justifyContent={'space-between'}
                spacing={3}
                >
                  <Grid
                  xs={4}>
                      <StyledButton
                          variant="outlined"
                          onClick={() => handlePeopleNumClick('1')}
                          className={peopleNum === '1' ? 'active' : ''}
                      >
                          单人餐
                      </StyledButton>
                  </Grid>
                  <Grid
                  xs={4}>
                      <StyledButton
                          variant="outlined"
                          onClick={() => handlePeopleNumClick('2')}
                          className={peopleNum === '2' ? 'active' : ''}
                      >
                          双人餐
                      </StyledButton>
                  </Grid>
                  <Grid
                  xs={4}>
                      <StyledButton
                          variant="outlined"
                          onClick={() => handlePeopleNumClick('4')}
                          className={peopleNum === '4' ? 'active' : ''}
                      >
                          3~4人
                      </StyledButton>
                  </Grid>
                  <Grid
                  xs={4}>
                      <StyledButton
                          variant="outlined"
                          onClick={() => handlePeopleNumClick('6')}
                          className={peopleNum === '6' ? 'active' : ''}
                      >
                          5~6人
                      </StyledButton>
                  </Grid>
                  <Grid
                  xs={4}>
                      <StyledButton
                          variant="outlined"
                          onClick={() => handlePeopleNumClick('8')}
                          className={peopleNum === '8' ? 'active' : ''}
                      >
                          7~8人
                      </StyledButton>
                  </Grid>
                  <Grid
                  xs={4}>
                      <StyledButton
                          variant="outlined"
                          onClick={() => handlePeopleNumClick('10')}
                          className={peopleNum === '10' ? 'active' : ''}
                      >
                          9~10人
                      </StyledButton>
                  </Grid>
              </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Grid container 
                direction="column" 
                spacing={3}>
                <Grid xs={12} 
                  md={4}>
                  <Typography variant="h6">分量</Typography>
                </Grid>
                <Grid container 
                spacing={3}>
                  <Grid
                  xs={4}>
                      <StyledButton
                          variant="outlined"
                          onClick={() => handleWeightClick('1')}
                          className={weight === '1' ? 'active' : ''}
                      >
                          偏大
                      </StyledButton>
                  </Grid>
                  <Grid
                  xs={4}>
                      <StyledButton
                          variant="outlined"
                          onClick={() => handleWeightClick('2')}
                          className={weight === '2' ? 'active' : ''}
                      >
                          普通
                      </StyledButton>
                  </Grid>
                  <Grid
                  xs={4}>
                      <StyledButton
                          variant="outlined"
                          onClick={() => handleWeightClick('3')}
                          className={weight === '3' ? 'active' : ''}
                      >
                          偏小
                      </StyledButton>
                  </Grid>
                  
              </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card sx={{ mt: 3 }}>
            <CardContent>
            <Grid container 
                direction="column" 
                spacing={2}>
                  <Grid 
                    xs={12} 
                    md={8}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}>
                        <Typography variant="text" 
                          paddingLeft={1}
                          sx={{color: '#faaf00'}}>{meat}%荤</Typography>
                        <Typography variant="text"
                          paddingRight={1}
                          sx={{color: '#faaf00'}}>{vegetable}%素</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={12} 
                    md={8}>
                    <Slider
                      aria-label="荤素"
                      defaultValue={10}
                      getAriaValueText={() => ''}
                      step={10}
                      value={meatSliderValue}
                      valueLabelDisplay="auto"
                      sx={{color: '#faaf00'}}
                      onChange={handleMeatSliderChange}
                      ref={meatSliderRef}
                    />
                  </Grid>
            </Grid>
            </CardContent>
          </Card>
          <Card sx={{ mt: 3 }}>
            <CardContent>
            <Grid container 
                direction="column" 
                spacing={2}>
                  <Grid xs={12} 
                  md={4}>
                  <Typography variant="h6">人均消费</Typography>
                </Grid>
                  <Grid xs={12} 
                    md={8}>
                    <Slider
                      aria-label="人均消费"
                      defaultValue={10}
                      getAriaValueText={() => ''}
                      step={10}
                      value={consumeSliderValue}
                      valueLabelDisplay="auto"
                      sx={{
                        color: '#faaf00',
                        '& .MuiSlider-markLabel': {
                          color: '#faaf00',
                        }
                      }}
                      marks={marks}
                      onChange={handleConsumeSliderChange}
                      ref={consumeSliderRef}
                    />
                  </Grid>
            </Grid>
            </CardContent>
          </Card>
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Grid container 
                direction="column" 
                spacing={3}>
                <Grid xs={12} 
                  md={4}>
                  <Typography variant="h6">忌口</Typography>
                </Grid>
                <Grid container 
                spacing={3}>
                  <Grid
                  xs={4}>
                      <StyledButton
                          variant="outlined"
                          onClick={() => handleDietClick('1')}
                          className={diet === '1' ? 'active' : ''}
                      >
                          辛辣
                      </StyledButton>
                  </Grid>
                  <Grid 
                  xs={4}>
                      <StyledButton
                          variant="outlined"
                          onClick={() => handleDietClick('2')}
                          className={diet === '2' ? 'active' : ''}
                      >
                          海鲜
                      </StyledButton>
                  </Grid>                  
              </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="flex-end"
            spacing={1}
            sx={{
              mt: 4,
              mb: 8
            }}
          >
            <Button
              onClick={generateMeun}
              sx={{
                color: 'black',
                backgroundColor: 'gray',
                '&:hover': {
                    backgroundColor: 'black',
                    color: 'white'
                  }
                }}>
              生成我的菜单
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <>{page}</>;

export default Page;
