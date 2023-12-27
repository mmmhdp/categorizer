import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button, Typography, Box } from "@mui/material";
const publicLink = "/src/assets/publication.jpg";
import { TypographyMain } from '../ui/Typography';

interface Props {
    link: string;
    title: string;
    category: string;
    site_id: number;
    page_id: number;
    theme: string;
    time: string;
}

export default function SiteCard(props: Props) {
    const { link, category, site_id, theme, time } = props;


    let source = `/article/${site_id}`;
    return (
        <Card sx={{ width: '320px', boxShadow: '0px 0px 10px 5px rgba(0,0,0,0.3)', borderRadius: '15px', mt: 2, mb: 10, ml: 'auto', mr: 'auto' }} >
            <CardContent style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box style={{ display: "flex", flexDirection: "column", flexWrap: 'wrap' }}>
                    <Box display='flex' justifyContent={'center'} alignItems='center' sx={{ maxWidth: '240px', mb: 2, }}>
                        <TypographyMain

                            sx={{
                                flexGrow: 1,
                                fontWeight: 400,
                                ml: 2,
                                mr: 2,
                                fontSize: 12,
                                color: '#333',
                                textDecoration: 'none',
                            }}
                        >
                            Время создания</TypographyMain>
                        |
                        <TypographyMain
                            sx={{
                                flexGrow: 1,
                                fontWeight: 400,
                                ml: 2,
                                fontSize: 12,
                                color: '#333',
                                textDecoration: 'none',
                            }}
                        >
                            {time}
                        </TypographyMain>
                    </Box>
                    <TypographyMain
                        sx={{
                            flexGrow: 1,
                            fontWeight: 600,
                            fontSize: 24,
                            ml: 1,
                            mr: 1,
                            letterSpacing: '.1rem',
                            color: 'secondary.main',
                            textDecoration: 'none',
                            flexWrap: 'wrap',
                            maxWidth: '300px',
                            wordWrap: 'break-word',
                        }}>
                        {link}
                    </TypographyMain>
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>

                        <Box sx={{ display: 'flex' }}>
                            <TypographyMain
                                sx={{
                                    textAlign: 'center',
                                    mr: 2,
                                    mt: 1,
                                    pt: 4,
                                    flexGrow: 1,
                                    fontWeight: 700,
                                    fontSize: '18px',
                                    color: '#281ac8',
                                    textDecoration: 'none',
                                }}
                            >
                                Категория
                            </TypographyMain>
                            <TypographyMain
                                sx={{
                                    textAlign: 'center',
                                    mr: 2,
                                    mt: 1,
                                    pt: 4,
                                    flexGrow: 1,
                                    fontWeight: 700,
                                    fontSize: '18px',
                                    color: '#585757',
                                    textDecoration: 'none',
                                }}
                            >
                                {category}
                            </TypographyMain>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
            {/* <CardActions style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <Button disabled={theme === ""} className="gradientButton" href={source} style={{ borderRadius: '20px', color: 'white' }} sx={{ mt: 'auto', mb: 2, ml: 1, mr: 1 }}>Подробнее</Button>
            </CardActions> */}

        </Card>
    );

}
