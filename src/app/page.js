'use client'
import { useState } from "react";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Switch from "react-switch";




export default function Home() {
  const [selectedBox, setSelectedBox] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isHeaderCollapsed, setHeaderCollapsed] = useState(true);
  const [filters, setFilters] = useState({
    frontBack: '',
    phase: '',
    bayNumber: '',
    customer: '',
    product: '',
    withProduct: false,
    bagsRemaining: '',
  });

  const handleBoxClick = (id, disabled) => {
    if (disabled) return;
    if (selectedBox === id) {
      setDrawerOpen(false);
      setSelectedBox(null);
    } else {
      setSelectedBox(id);
      setDrawerOpen(true);
    }
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedBox(null);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const getPhase = (boxIndex) => {
    if (boxIndex <= 15) return 'Phase 1';
    if (boxIndex > 15 && boxIndex <= 30) return 'Phase 2';
    if (boxIndex > 30) return 'Phase 3';
    return 'Unknown Phase';
  };

  const filterMatch = (boxIndex, prefix) => {
    const phase = getPhase(boxIndex);
  
    const phaseMatch =
      filters.phase === '' || filters.phase === phase;
  
    const frontBackMatch =
      filters.frontBack === '' || filters.frontBack === prefix;
  
    const bayNumberMatch =
      filters.bayNumber === null || parseInt(filters.bayNumber) === boxIndex;
  
    return phaseMatch && frontBackMatch && bayNumberMatch;
  };
  





  const renderBoxes = (phase1, phase2, phase3, prefix) => {
    const allBoxes = [...phase1, ...phase2, ...phase3];

    // Helper function to return static color classes
    const getBoxColorClasses = (boxIndex) => {
      if (boxIndex <= 15) return "bg-yellow-100 border-yellow-600";
      if (boxIndex <= 30) return "bg-green-100 border-green-600";
      return "bg-teal-100 border-teal-600";
    };

    return (
      <div className="flex gap-2 pr-4 overflow-x-auto">
        {allBoxes.map((boxIndex) => {
          const disabled = !filterMatch(boxIndex, prefix);
          const boxColorClasses = getBoxColorClasses(boxIndex); // Get the static class names

          return (
            <Tooltip
              key={prefix + boxIndex}
              title={
                <div className="text-center p-2">
                  <p className="text-sm font-semibold text-gray-700">Box {boxIndex}</p>
                  <p className="text-xs text-gray-500">{getPhase(boxIndex)}</p>
                  <p className="text-xs text-gray-500">{prefix === 'F' ? 'Front' : 'Back'}</p>
                </div>
              }
              arrow
              classes={{
                tooltip: 'custom-tooltip',
                arrow: 'custom-tooltip-arrow',
              }}
            >
              <div
                className={`w-24 h-24 rounded-md ${disabled
                  ? 'bg-gray-300 cursor-not-allowed'
                  : `${boxColorClasses} cursor-pointer hover:bg-yellow-200 hover:shadow-lg transform transition-all duration-300 ease-in-out`
                  } border flex items-center justify-center`}
                onClick={() => handleBoxClick(prefix + boxIndex, disabled)}
              >
                <span className="text-black font-bold">{boxIndex}</span>
              </div>
            </Tooltip>
          );
        })}
      </div>
    );
  };





  return (
    <main className="flex flex-col h-screen relative">
      {/* Header con animación de colapsado y superpuesto al contenido */}
      <aside
        className={`fixed top-0 left-0 h-full shadow-lg z-30 transition-transform duration-300 ease-in-out ${isHeaderCollapsed ? '-translate-x-full' : 'translate-x-0'} menu-container`}
        style={{ width: '250px' }} // Fixed width for the sidebar
      >
        {!isHeaderCollapsed && (
          <>
            {/* Button over the logo to close the menu */}
            <IconButton
              onClick={() => setHeaderCollapsed(true)}
              className="absolute left-4 top-4 menu-icon-button z-50"
            >
              <MenuIcon style={{ fontSize: '36px' }} />
            </IconButton>

            <div className="menu-logo p-4"></div>
            <div className="flex flex-col items-center space-y-4 p-4">
              <div className="menu-item"></div>
              <div className="menu-item"></div>
            </div>
          </>
        )}
      </aside>

      {/* Floating button to open the menu when collapsed */}
      {isHeaderCollapsed && (
        <IconButton
          onClick={() => setHeaderCollapsed(false)}
          className="menu-fixed-icon-button"
        >
          <MenuIcon style={{ fontSize: '36px' }} />
        </IconButton>
      )}

      <section className="flex-1 p-4 flex flex-col items-center justify-start overflow-auto relative mt-24">
        <div className="flex flex-col w-full max-w-full lg:max-w-7xl">


          <div className="bg-white mb-8 p-6 rounded-lg shadow-lg w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {/* Front/Back Filter */}
              <FormControl variant="outlined" className="w-full">
                <InputLabel>Front/Back</InputLabel>
                <Select
                  value={filters.frontBack}
                  onChange={handleFilterChange}
                  label="Front/Back"
                  name="frontBack"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="F">Front</MenuItem>
                  <MenuItem value="B">Back</MenuItem>
                </Select>
              </FormControl>

              {/* Phase Filter */}
              <FormControl variant="outlined" className="w-full">
                <InputLabel>Phase</InputLabel>
                <Select
                  value={filters.phase}
                  onChange={handleFilterChange}
                  label="Phase"
                  name="phase"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Phase 1">Phase 1</MenuItem>
                  <MenuItem value="Phase 2">Phase 2</MenuItem>
                  <MenuItem value="Phase 3">Phase 3</MenuItem>
                </Select>
              </FormControl>

              {/* Bay Number Filter */}
              <TextField
                label="Bay Number"
                variant="outlined"
                className="w-full"
                name="bayNumber"
                value={filters.bayNumber !== null ? filters.bayNumber : ''}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || (parseInt(value, 10) >= 0 && parseInt(value, 10) <= 48)) {
                    setFilters({ ...filters, bayNumber: value === '' ? null : parseInt(value, 10) });
                  }
                }}
                type="number"
                inputProps={{ min: 0, max: 48 }}
              />


              {/* Customer Filter */}
              <TextField
                label="Customer"
                variant="outlined"
                className="w-full"
                name="customer"
                value={filters.customer}
                onChange={handleFilterChange}
              />

              {/* % of Bags Remaining Filters */}
              <div className="border border-gray-300 p-4 rounded-lg shadow-sm bg-white lg:col-span-2">
                <FormControl variant="outlined" className="w-full">
                  <InputLabel>% of Bags Remaining</InputLabel>
                  <Select
                    value={filters.bagsFilter}
                    onChange={handleFilterChange}
                    label="% of Bags Remaining"
                    name="bagsFilter"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="greaterThan">Greater than</MenuItem>
                    <MenuItem value="lessThan">Less than</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Percentage"
                  variant="outlined"
                  className="w-full mt-2"
                  name="bagsRemaining"
                  value={filters.bagsRemaining}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (value >= 0 && value <= 100) {
                      handleFilterChange(e);
                    }
                  }}
                  type="number"
                  inputProps={{ min: 0, max: 100 }}
                />
              </div>

              {/* Days in Inventory Filters */}
              <div className="border border-gray-300 p-4 rounded-lg shadow-sm bg-white lg:col-span-2">
                <FormControl variant="outlined" className="w-full">
                  <InputLabel>Days in Inventory</InputLabel>
                  <Select
                    value={filters.daysFilter}
                    onChange={handleFilterChange}
                    label="Days in Inventory"
                    name="daysFilter"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="greaterThan">Greater than</MenuItem>
                    <MenuItem value="lessThan">Less than</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Number of Days"
                  variant="outlined"
                  className="w-full mt-2"
                  name="daysInInventory"
                  value={filters.daysInInventory}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (value >= 0) {
                      handleFilterChange(e);
                    }
                  }}
                  type="number"
                />
              </div>

              {/* Product Filter and Custom Styled Switch with Label */}
              <div className="w-full lg:col-span-2">
                <TextField
                  label="Product"
                  variant="outlined"
                  className="w-full mb-4"
                  name="product"
                  value={filters.product}
                  onChange={handleFilterChange}
                />
                <div className="flex items-center space-x-3">
                  <Switch
                    checked={filters.withProduct}
                    onChange={(checked) => setFilters({ ...filters, withProduct: checked })}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={30}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={48}
                  />
                  <span className="text-gray-700 font-medium">Locations with product</span>
                </div>
              </div>
            </div>
          </div>





          {/* Boxes Container */}
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full lg:mt-8 overflow-x-auto">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                {/* Fixed width for Front label */}
                <div className="text-left text-2xl font-bold mr-4 text-gray-700 uppercase tracking-wide" style={{ minWidth: "120px" }}>
                  Back
                </div>
                <div className="flex flex-wrap gap-4">
                  {renderBoxes(
                    Array.from({ length: 15 }, (_, i) => i + 1),
                    Array.from({ length: 15 }, (_, i) => i + 16),
                    Array.from({ length: 18 }, (_, i) => i + 31),
                    "B"
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                {/* Fixed width for Back label */}
                <div className="text-left text-2xl font-bold mr-4 text-gray-700 uppercase tracking-wide" style={{ minWidth: "120px" }}>
                  Front
                </div>
                <div className="flex flex-wrap gap-4">
                  {renderBoxes(
                    Array.from({ length: 15 }, (_, i) => i + 1),
                    Array.from({ length: 15 }, (_, i) => i + 16),
                    Array.from({ length: 18 }, (_, i) => i + 31),
                    "F"
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menú derecho */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={closeDrawer}
        PaperProps={{
          style: {
            width: '400px',
            borderTopLeftRadius: '24px',
            borderBottomLeftRadius: '24px',
          },
        }}
      >
        <Box p={3} textAlign="center" role="presentation">
          <Button onClick={closeDrawer} variant="contained" color="primary">
            Close
          </Button>
          <p className="mt-4">Box {selectedBox}</p>
        </Box>
      </Drawer>
    </main>


  );
}


