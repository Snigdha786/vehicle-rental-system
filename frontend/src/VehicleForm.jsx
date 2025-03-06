import React, { useState } from "react";
import {
  Button,
  Radio,
  TextField,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";

const steps = ["Name", "Wheels", "Vehicle Type", "Model", "Date Range"];

const BookingForm = () => {
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false); 
  const [wheels, setWheels] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehicleModels, setVehicleModels] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    wheels: "",
    vehicleType: "",
    model: "",
    dateRange: { start: null, end: null },
  });

  const [error, setError] = useState("");

  const handleNext = async () => {
    if (validateStep()) {
      setStep(step + 1);
      setError("");
    } else {
      setError("Please fill out this field");
    }
   
      const queryParams = new URLSearchParams({...formData, step:step}).toString();
      const response = await axios.get(
        `http://localhost:5000/api/vehicles/details?${queryParams}`,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      console.log("Response Data From Backend:", response.data);
      setWheels(response.data.vehicleWheels);
      setVehicleTypes(response.data.vehicleTypes);
      setVehicleModels(response.data.vehicleModels);
  };

  const handleBack = () => {
    setStep(step - 1);
    console.log("wheels@@@@",wheels)
    setError("");
  };

  const handleSubmit = async () => {
    const { start, end } = formData.dateRange;

    if (!start || !end) {
      setError("Date Range is required.");
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/vehicles/submit",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      console.log("Server Response on Submit:", response.data);
      setSuccess(response.data.successFlag);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const validateStep = () => {
    const { firstName, lastName, wheels, vehicleType, model, dateRange } =
      formData;
    switch (step) {
      case 0:
        return firstName.trim() && lastName.trim();
      case 1:
        return wheels !== "";
      case 2:
        return vehicleType !== "";
      case 3:
        return model !== "";
      case 4:
        return dateRange.start !== null && dateRange.end !== null;
      default:
        return false;
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 text-center">
          {success ? (
            <>
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Success!
              </h2>
              <p className="text-gray-700">
                Your booking has been successfully submitted.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-red-700 mb-4">Failed!</h2>
              <p className="text-gray-700">
                Booking already exists. Please try again.
              </p>
            </>
          )}
          <Button
            variant="contained"
            className="bg-blue-500 hover:bg-blue-700 text-white mt-4"
            onClick={() => {
              setStep(0);
              setSubmitted(false);
              setError();
              setFormData({
                firstName: "",
                lastName: "",
                wheels: "",
                vehicleType: "",
                model: "",
                dateRange: { start: null, end: null },
              });
            }}
          >
            Book Another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          {steps[step]}
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="mb-6">
          {step === 0 && (
            <div className="space-y-12">
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col items-center space-y-2">
              <RadioGroup
                value={formData.wheels}
                onChange={(e) =>
                  setFormData({ ...formData, wheels: e.target.value })
                }
                className="flex flex-col items-center"
              >
                {wheels.map((wheel) => (
                  <FormControlLabel
                    key={wheel.wheels}
                    value={wheel.wheels}
                    control={<Radio />}
                    label={`${wheel.wheels} Wheeler`}
                  />
               ))}
                {/* <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="2 Wheeler"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="4 Wheeler"
                /> */}
              </RadioGroup>
            </div>
          )}

          {step === 2 && (
            <select
              className="w-full p-2 border rounded-md"
              value={formData.vehicleType}
              onChange={(e) =>
                setFormData({ ...formData, vehicleType: e.target.value })
              }
            >
              <option> Select {formData.wheels} Wheeler Vehicle Type</option>
              {vehicleTypes.map((item, index) => (
                <option key={index} value={item.type_name}>
                  {item.type_name}
                </option>
              ))}
            </select>
          )}

          {step === 3 && (
            <select
              className="w-full p-2 border rounded-md"
              value={formData.model}
              onChange={(e) =>
                setFormData({ ...formData, model: e.target.value })
              }
            >
              <option value="">Select {formData.vehicleType} Model</option>
              {vehicleModels.map((item, index) => (
                <option key={index} value={item.model_name}>
                  {item.model_name}
                </option>
              ))}
            </select>
          )}

          {step === 4 && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex flex-col space-y-4">
                {/* Start Date Picker */}
                <DatePicker
                  label="Start Date"
                  value={formData.dateRange.start}
                  onChange={
                    (newDate) =>
                      setFormData({
                        ...formData,
                        dateRange: {
                          ...formData.dateRange,
                          start: newDate,
                          end: null,
                        },
                      }) 
                  }
                  shouldDisableDate={(date) => date.isBefore(new Date(), "day")}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />

                {/* End Date Picker */}
                <DatePicker
                  label="End Date"
                  value={formData.dateRange.end}
                  onChange={(newDate) =>
                    setFormData({
                      ...formData,
                      dateRange: { ...formData.dateRange, end: newDate },
                    })
                  }
                  shouldDisableDate={(date) =>
                    formData.dateRange.start
                      ? date.isBefore(formData.dateRange.start, "day")
                      : true
                  } // Disable dates before start date
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </div>
            </LocalizationProvider>
          )}
        </div>

        <div className="flex justify-between mt-4">
          {step > 0 && (
            <Button
              variant="contained"
              onClick={handleBack}
              sx={{ backgroundColor: "red" }}
            >
              Back
            </Button>
          )}
          {step < steps.length - 1 ? (
            <Button
              variant="contained"
              sx={{ backgroundColor: "blue" }}
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ backgroundColor: "green" }}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
