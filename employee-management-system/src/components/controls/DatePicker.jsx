import React from 'react'

export default function DatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Stack spacing={3}>
     
      <DatePicker
        disableFuture
        label="Responsive"
        openTo="year"
        views={['year', 'month', 'day']}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </Stack>
  </LocalizationProvider>
  )
}
