import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import addExportingModule from 'highcharts/modules/exporting'
import addExportData from 'highcharts/modules/export-data'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

addExportingModule(Highcharts)
addExportData(Highcharts)

const Chart = ({ disneyCharacters }) => {
  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: 'Disney characters (Number of films)',
      align: 'center',
    },
    tooltip: {
      formatter: function () {
        return `<b>${this.point.name}:</b> ${this.point.percentage.toFixed(
          2
        )}% <br><br><b>Films:</b>${this.point.films.map(
          (film, index) => `<br><div>${index + 1}) ${film}</div>`
        )}`
      },
    },
    // accessibility: {
    //   point: {
    //     valueSuffix: '%',
    //   },
    // },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y}',
        },
      },
    },
    series: [
      {
        name: 'Films',
        colorByPoint: true,
        data: [
          ...disneyCharacters.map((item) => {
            return { name: item.name, y: item.films.length, films: item.films }
          }),
        ],
      },
    ],
  }

  return (
    <Box marginBottom={4} marginTop={4}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>PIE chart</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {disneyCharacters && (
            <HighchartsReact highcharts={Highcharts} options={options} />
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default Chart
