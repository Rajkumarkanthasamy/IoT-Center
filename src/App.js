import logo from './logo.svg';
import './App.css';
import Meter from './Meter';
import {Container,} from '@mui/material';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { styled, alpha } from '@mui/material/styles';
import {Button, IconButton, Typography, Box, Grid} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Options from './Options'
import WidgetsIcon from '@mui/icons-material/Widgets';
import NotesIcon from '@mui/icons-material/Notes';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import CachedIcon from '@mui/icons-material/Cached';
import TableRowsIcon from '@mui/icons-material/TableRows';
import GaugeChart from 'react-gauge-chart'
import GaugeComponent from 'react-gauge-component'
import LineChart from "./LineChart"
import Battery from './Battery';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StorageIcon from '@mui/icons-material/Storage';
import TimelineIcon from '@mui/icons-material/Timeline';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
//import {ViewInArIcon} from '@mui/icons-material';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import HumidityMeter from './HumitidyMeter';
import EmptyCell from './AlertFolder/EmptyCell';
import { useEffect, useState } from 'react';
import AddCell from './AddCell/AddCell';
//import { set } from 'mongoose';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minHeight:"280px",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  backgroundColor:"#0F0E16"
  
}));


const ItemBattery = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minHeight:"280px",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  backgroundColor:"gray",
  borderTopLeftRadius:"0px",
  borderTopRightRadius:"0px"
}));

function App() {

    const [openAddCell, setopenAddCell] = useState(false) 


    const [TotalNumberOfCell, setTotalNumberOfCell] = useState([])
    const [showEmptyCell, setshowEmptyCell] = useState(true) 

    const [CurrentDeviceValue, setCurrentDeviceValue]=useState({Temperature:"", Humidity:"", Batterypercentage:""})

    const [currentDeviceName, setcurrentDeviceName] = useState("")

    const [tempMQTT, settempMQTT] = useState(null)
    const [humidtyMQTT, sethumidtyMQTT] = useState(null)
    const [vbattMQTT, setvbattMQTT] = useState(null)

    var regex = /\d{0,2}/;

    const serverresponse = async () => {
      const response = await axios.get('http://localhost:3000/MQTTdata')        
      return response.data
  }


  setInterval(()=>{
    serverresponse().then((res)=>{
      console.log(res.obj[4].vbatt)
      sethumidtyMQTT(res.obj[4].humidty)
      var convertPercentage = (res.obj[4].vbatt / 3594) * 100
      setvbattMQTT(convertPercentage)
      settempMQTT(res.obj[4].temp)
    }).catch((errors)=>{
      console.log(errors)
    })
  },2000)

    // const fetchData = async () => {
    //   try {
    //     // Make an asynchronous request using Axios
    //     const response = await axios.get('10.27.16.235:3000/MQTTdata');
        
    //     // Update state with the received data
    //     setMqttData(response.data);
    //     console.log(response)
    //   } catch (err) {
    //     // Handle errors
    //     setMqttData(err.message);
    //   }
    // };
  
    // useEffect(() => {
    //   // Call the async function within the useEffect
    //   fetchData();
    // }, []);


    useEffect(()=>{

      TotalNumberOfCell.map((DeviceDetails)=>{
          if(DeviceDetails.cellName == currentDeviceName){
          setCurrentDeviceValue({Temperature:DeviceDetails.cellTemperature, Humidity:DeviceDetails.cellHumitidy, Batterypercentage:DeviceDetails.cellBattery})
          }
      })
      

    },[currentDeviceName])

    const handleCloseAddCell = (value) => {
      setopenAddCell(value);
    };

    const handleOpenAddCellFromEmpety = (value) => {
      setopenAddCell(value);
    };



    const AddNewCell=(data)=>{
      console.log("----------"+Object.keys(TotalNumberOfCell).length)
      if(Object.keys(TotalNumberOfCell).length >= 1){
        setTotalNumberOfCell([...TotalNumberOfCell, data])
        
      }else{
      setcurrentDeviceName(data.cellName)
      setCurrentDeviceValue({Temperature:data.cellTemperature, Humidity:data.cellHumitidy, Batterypercentage:data.cellBattery})
      setTotalNumberOfCell([...TotalNumberOfCell, data])
      }
      setshowEmptyCell(false)
    }

  return (
    <>
    
    <Paper elevation={3}  maxWidth="auto"  sx={{backgroundColor:"#000", height:"auto",display:"flex", justifyContent:"flex-start"}}>

    <div style={{width:"70px", height:"auto", backgroundColor:"#202028"}}>
    <Grid direction={"column"} justifyContent={"flex-start"} alignItems={"center"}  container>
    <ViewInArIcon style={{marginTop:"15px", marginBottom:"15px", fontSize:"35px", color:"#FFF"}}  />
    <AccountCircleIcon style={{marginTop:"15px", marginBottom:"15px", fontSize:"35px", color:"#FFF"}} />
    <StorageIcon style={{marginTop:"15px", marginBottom:"15px", fontSize:"35px", color:"#FFF"}}/>
    <TimelineIcon style={{marginTop:"15px", marginBottom:"15px", fontSize:"35px", color:"#FFF"}}/>
    <DashboardOutlinedIcon style={{marginTop:"15px", marginBottom:"15px", fontSize:"35px", color:"#FFF"}}/>
    <AssignmentOutlinedIcon style={{marginTop:"15px", marginBottom:"15px", fontSize:"35px", color:"#FFF"}}/>
    <NotificationsNoneOutlinedIcon style={{marginTop:"15px", marginBottom:"15px", fontSize:"35px", color:"#FFF"}}/>
    <BuildOutlinedIcon style={{marginTop:"15px", marginBottom:"15px", fontSize:"35px", color:"#FFF"}}/>
    </Grid>
    
    </div>

    <div style={{width:"100%", minHeight:"100vh", backgroundColor:"#000", height:"100%"}}>

      {/* Header */}
      <div style={{width:"100%", height:"70px", backgroundColor:"#181820", display:"flex", justifyContent:"left", alignItems:"center",}}>
        <Typography style={{ paddingLeft:"1%", fontSize:"", color:"#FFF"}} variant='h5'>IoT Center</Typography>
      </div>
      {/* menu bar */}
      <div style={{width:"100%", height:"70px", backgroundColor:"#181820", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        {/* Buttons */}
        {/* Left Buttons */}
      <div>
      <Button onClick={()=>setopenAddCell(!openAddCell)} style={{margin:"5px", textTransform:"none"}} variant="contained" startIcon={<WidgetsIcon />}>Add Cell</Button>
      <Button style={{margin:"5px", textTransform:"none", backgroundColor:"#393846", color:"#FFF"}} variant="outlined" startIcon={<NotesIcon />}>Add Note</Button>
      <Button style={{margin:"5px", textTransform:"none", backgroundColor:"#9933ff"}} variant="contained" startIcon={<ViewInArIcon />}>Variables</Button>

      </div>
      {/* Right Buttons */}
      <div style={{display:"flex",justifyContent:"space-between"}}>
      
      <select style={{width:"130px", borderRadius:"5px", fontSize:"18px", backgroundColor:"#393846", color:"#FFF", margin:"5px", height:"40px", padding:"5px"}}>
        <option style={{width:"130px"}}>{<DeleteIcon />}Local</option>
        <option style={{width:"130px"}}>Past 2h</option>
        <option style={{width:"130px"}}>Past 3h</option>
      </select>

      <IconButton><CachedIcon style={{color:"#fff", backgroundColor:"#000", padding:"5px"}}/></IconButton>

      <select style={{margin:"5px",width:"150px", borderRadius:"5px", fontSize:"18px", backgroundColor:"#393846", color:"#FFF", padding:"5px"}}>
        <option style={{width:"130px"}}>Past 1h</option>
        <option style={{width:"130px"}}>Past 2h</option>
        <option style={{width:"130px"}}>Past 3h</option>
      </select>
      </div>
      </div>  
      {/* menu end */}
      <div style={{width:"100%", height:"70px", backgroundColor:"#0F0E16", display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
      
      

      <Button style={{margin:"5px", textTransform:"none", color:"#9933ff", backgroundColor:"#272030"}} variant="contained" startIcon={<TableRowsIcon />}>IoT_Device</Button>


      <select  onChange={(e)=>setcurrentDeviceName(e.target.value)} style={{margin:"5px",width:"200px", borderRadius:"5px", fontSize:"18px", backgroundColor:"#393846", color:"#FFF", padding:"5px", height:"37px",}}>
        {Object.keys(TotalNumberOfCell).length==0?<option style={{width:"130px"}}>Please Select here</option>:null}
        {
          TotalNumberOfCell.map((cellName)=>{
            return(
              <option value={cellName.cellName} style={{width:"130px"}}>{cellName.cellName}</option>
            )
          })
        }

        {/* <option style={{width:"130px"}}>Virtual_device</option>
        <option style={{width:"130px"}}>Past 2h</option>
        <option style={{width:"130px"}}>Past 3h</option> */}

      </select>
      </div>

      {/* Meter */}


     {/* {openAddCell ?<AddCell Close={handleCloseAddCell} data={AddNewCell}/>:null} 

     {showEmptyCell ? <EmptyCell handleOpenAddCellFromEmpety={handleOpenAddCellFromEmpety} />:null}
      

     {currentDeviceName.length >= 1 ? */}
     <>
     <div style={{marginTop:"20px", margin:"10px"}}>

     <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs>
          <Grid style={{display:"flex", justifyContent:"space-between", alignItems:"center", color:"#FFF", backgroundColor:"#0F0E16", padding:"10px"}}>

            <Grid style={{justifyContent:"space-around", display:"flex", alignItems:"center"}}>
            <CalendarViewDayIcon/>
            <Typography>Actual Temperature</Typography>
            </Grid>

            <Grid style={{justifyContent:"space-around", display:"flex", alignItems:"center"}}>
            <SettingsApplicationsIcon/>
            </Grid>
          </Grid>
          <Item>
          <Meter data={regex.exec(tempMQTT)}/>
          </Item>
        </Grid>
        <Grid item xs={4}>
        <Grid style={{display:"flex", justifyContent:"space-between", alignItems:"center", color:"#FFF", backgroundColor:"#0F0E16", padding:"10px"}}>

          <Grid style={{justifyContent:"space-around", display:"flex", alignItems:"center"}}>
          <CalendarViewDayIcon/>
          <Typography>Actual Humidity</Typography>
          </Grid>

          <Grid style={{justifyContent:"space-around", display:"flex", alignItems:"center"}}>
          <SettingsApplicationsIcon />
          </Grid>


          </Grid>
          <Item >
            <HumidityMeter data={regex.exec(humidtyMQTT)} />
            </Item>
        </Grid>
        <Grid item xs={4}>
        <Grid style={{display:"flex", justifyContent:"space-between", alignItems:"center", color:"#FFF", backgroundColor:"gray", padding:"10px"}}>

        <Grid style={{justifyContent:"space-around", display:"flex", alignItems:"center"}}>
        <BatteryFullIcon style={{transform: "rotate(90deg)", marginRight:"10px"}}/>
        <Typography>Battery</Typography>
        </Grid>

        <Grid style={{justifyContent:"space-around", display:"flex", alignItems:"center"}}>
        <SettingsApplicationsIcon/>
        </Grid>

        </Grid>
          <ItemBattery>
            {/* regex.exec() */}
          <Battery data={vbattMQTT}/>
          </ItemBattery>
        </Grid>

      </Grid>
    </Box>
     </div>

      <div style={{backgroundColor:"#FFF", margin:"10px"}}>
      <LineChart/>
      </div>
      </>

      {/* :null } */}
      


    </div>    
    
    </Paper>    
    </>
  );
}

export default App;
//<Meter/>