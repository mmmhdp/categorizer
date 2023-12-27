import { TypographyHeader } from "../ui/Typography"
import SiteCard from "../widgets/VideoCard";
import { useEffect, useState } from "react";

const siteData = {
    url: 'https://smth/smth/smth/smth',
    category: 'Техника',
    id: 0,
    timeStamp: '20.12.2023 00:37'
}

function AllSites() {

    const [siteRecords, setSiteRecords] = useState<any[]>([siteData, siteData, siteData, siteData, siteData]);    

    useEffect(() => {
        
        let sites: any = [];
        const fetchData1 = async () => {
            // for (let i = 0; i < storedArray1.length; i++) {
            //     let id = Number(String(storedArray1[i].data));
                        
            //     try {
            //         let response = await ApiService.getWebsiteById(id);
            //         sites.push(response.data);
            //     } catch (error) {
            //         console.log(error);
            //     }
            // }
            // setSiteRecords(sites);
        };
        fetchData1();
    }, []);

    return (
        <>
            <div style={{
                width: '100%', minHeight: 'calc(100vh - 76px)', flexWrap: 'wrap',
                display: 'flex',
                justifyContent: 'center', flexDirection: 'column', margin: '0 30px 0 30px',
            }}>
                <TypographyHeader sx={{ color: 'white', alignSelf: 'center', mb: 2 }}>Все запросы</TypographyHeader>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '40px' }}>
                    {siteRecords.map((site: any) => {
                        return (
                            <SiteCard
                                link={site.url}
                                title={''}
                                category={site.category}
                                site_id={site.id}
                                page_id={0}
                                time={site.timeStamp}
                                theme={''}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    )
}

export default AllSites
