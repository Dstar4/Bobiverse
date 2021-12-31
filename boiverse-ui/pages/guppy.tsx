import {useState} from 'react'
import PageLayout from '../components/Layout'
import {Sector} from '../components/three/Sector'
import {useBobs} from '../hooks/useBobs'
import {useScan} from '../hooks/useScan'
import {Coordinates, Bob, Mineral, Drone} from '../types/global'
import {MineralsTable} from '../components/tables/minerals'
import {BobsTable} from '../components/tables/bobs'
import {DronesTable} from '../components/tables/drones'
import {Typography} from 'antd'
import {useDrones} from '../hooks/useDrones'

const {Title} = Typography

function Guppy() {
  const [selectedBob, setSelectedBob] = useState(1)
  let {data: scanResults, error: scanError} = useScan(selectedBob)
  let {data: bobs, error: bobsError} = useBobs()
  let {data: drones, error: dronesError} = useDrones(selectedBob)

  const bobsData: Bob[] = bobs ? bobs.bobs : []
  const dronesData: Drone[] = drones ? drones.data.data : []

  const scanData: {minerals: Mineral[]; bobs: Bob[]; drones: Drone[]} =
    scanResults ? scanResults.data : []

  const activeBob = bobsData.filter((bob: Bob) => bob.id === selectedBob)[0]

  const formatCoords = (data: Mineral[] | Bob[] | Drone[]) =>
    data.map(x => arrangeCoords(x.coordinates))
  // console.log('formatCoords', location.id)

  return (
    <PageLayout>
      <div>
        <Title style={{textAlign: 'center'}}>Guppy</Title>
        <section>
          {scanResults && bobs && drones && (
            <Sector
              scanCoords={formatCoords(
                scanData?.minerals?.filter(
                  bob => bob.location_id === activeBob.location.id
                )
              )}
              bobsCoords={formatCoords(
                bobsData.filter(
                  bob => bob.location_id === activeBob.location.id
                )
              )}
              dronesCoords={formatCoords(
                dronesData.filter(
                  drone => drone.location_id === activeBob.location.id
                )
              )}
            />
          )}
          <Title level={2} style={{textAlign: 'center'}}>
            Location: {activeBob?.location?.system}
          </Title>
        </section>
        <div style={{display: 'flex'}}>
          <div>
            <Title level={3} style={{textAlign: 'center'}}>
              Assets
            </Title>
            <BobsTable bobs={bobsData} setSelectedBob={setSelectedBob} />
            <DronesTable drones={dronesData} />
          </div>
          <div>
            <Title level={3} style={{textAlign: 'center'}}>
              Scan Results
            </Title>
            <BobsTable bobs={scanData.bobs} setSelectedBob={setSelectedBob} />
            <DronesTable drones={scanData.drones} />
            <MineralsTable minerals={scanData.minerals} />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default Guppy

function arrangeCoords(coords: Coordinates) {
  return [coords.x, coords.y, coords.z].map(c => c / 3.5)
}
