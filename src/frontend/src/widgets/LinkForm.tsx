import { Paper, TextField, Typography, Box, Button, InputAdornment } from "@mui/material";
import { useState } from 'react'
// import ApiService from "../services/api";
import DownloadIcon from '@mui/icons-material/Download';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from "react-router-dom";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { TypographyHeader } from "../ui/Typography";


const LinkForm = () => {
    const navigate = useNavigate();
    const [linkArr, setLinkArr] = useState<string[]>([]);
    const [error3, setError3] = useState(false);
    const [helperText3, setHelperText3] = useState('');
    const [diasableButton, setdisableButton] = useState(false)
    const [disableUploadButton, setDisableUploadButton] = useState(false);

    function isDomainOnlyUrl(url: string): boolean {
        const pattern = /^(http|https):\/\/[^\/]*\/?$/;
        return pattern.test(url);
    }
    const handleMultipleLinksChange = (event: any) => {
        const inputText = event.target.value;
        const lines = inputText.split('\n')
        let linkSet = new Set<string>();

        const urlRegex = /^(https?|http):\/\/[^\s/$.?#].[^\s]*$/i;
        let isInvalidFormat = false;
        for (let line of lines) {
            line = line.trim()
            if (
                urlRegex.test(
                    line
                ) && line.match(/http/g).length === 1
            ) {
                setError3(false);
                setHelperText3('');
                console.log('sfffff')
                linkSet.add(line);
            } else {
                setError3(true);
                console.log('jfjf')
                isInvalidFormat = true;
                setHelperText3('Неверный формат ввода ссылки. Вводите каждую ссылку с новой строки');
            }
            if (inputText.trim() === '') {
                setError3(false);
                setHelperText3('');
                console.log('jdgf')
                // setdisableButton(false);
                isInvalidFormat = false;
                setDisableUploadButton(false);
              }
        }
        setdisableButton(isInvalidFormat)
        // setdisableButton(inputText.trim() !== '' && !selectedFile);
        setDisableUploadButton(inputText.trim() !== '' || isInvalidFormat);
        setLinkArr(Array.from(linkSet));
    }

    function formatTime(date: any) {
        let localDate = date.toLocaleString();
        let parts = localDate.split(/[\s,\/:]+/);
        let day = parts[1].padStart(2, '0');
        let month = parts[0].padStart(2, '0');
        let year = parts[2].substr(-2);
        let hours = parts[3].padStart(2, '0');
        let minutes = parts[4];
        let formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
        return formattedDate;
    }

    // handle submit
    async function handleSubmit() {
        let errorEmpty = false;
        let Urls = [];
        if (selectedFile) Urls = uploadedFiles;
        else Urls = linkArr;
        // check if link valid
        if (!linkArr) {
            setError3(true);
            errorEmpty = true;
            setHelperText3("Введите ссылки на сайты. Каждая ссылка в новой строке");
        } else {
            setError3(false);
            errorEmpty = false;
            setHelperText3("");
        }
        if (!error3 && !errorEmpty) {
            let sites = [];
            let pages = [];
            for (let i = 0; i < Urls.length; i++) {
                if (isDomainOnlyUrl(Urls[i])) {
                    if (Urls[i].endsWith("/")) {
                        Urls[i] = Urls[i].slice(0, -1);
                    }
                    Urls[i] = Urls[i].trim();
                    // try {
                    //     let response = await ApiService.createSite({
                    //         url: Urls[i],
                    //     });
                    //     sites.push({ data: response.data, timestamp: formatTime(new Date()), url: Urls[i] });
                    // } catch (error) {
                    //     let response = await ApiService.checkSiteUrl({
                    //         url: Urls[i],
                    //     });
                    //     sites.push({ data: response.data.id, timestamp: formatTime(new Date()), url: Urls[i] });
                    // }
                }
                else {
                    if (Urls[i].endsWith("/")) {
                        Urls[i] = Urls[i].slice(0, -1);
                    }
                    Urls[i] = Urls[i].trim();
                    // try {
                    //     let response = await ApiService.createSubPage({
                    //         url: Urls[i],
                    //     });

                    //     pages.push({ data: response.data, timestamp: formatTime(new Date()), url: Urls[i] });
                    // } catch (error) {
                    //     let response = await ApiService.checkPageUrl({
                    //         url: Urls[i],
                    //     });

                    //     pages.push({ data: response.data.id, timestamp: formatTime(new Date()), url: Urls[i] });

                    // }
                }
            }
            if (Urls.length !== 0) navigate(`sites`);
        }
    }

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const [errorText, setErrorText] = useState('');
    const [textFieldDisabled, setTextFieldDisabled] = useState(false);

    function parseCSV(csvData: string): { columns: number, urls: string[] } {
        const lines = csvData.split('\n');
        const urls: string[] = [];
        let columns = 0;
      
        for (const line of lines) {
          const columnsInLine = line.split(',');
          if (columnsInLine.length > columns) {
            columns = columnsInLine.length;
          }
      
          for (const column of columnsInLine) {
            const trimmedColumn = column.trim();
            if (trimmedColumn) {
              urls.push(trimmedColumn);
            }
          }
        }
      
        return { columns, urls };
      }
      
    const handleFileInputChange = (e: any) => {
        const file = e.target.files[0];
        if (!file) {
            setSelectedFile(null);
            setErrorText('');
            return;
        }
        const allowedExtensions = ['.csv'];
        const fileExtension = file.name.split('.').pop();
        if (!allowedExtensions.includes(`.${fileExtension}`)) {
            setSelectedFile(null);
            setErrorText('Неверный формат, пожалуйста загрузите файл типа: .csv, .xlsx, or .xlsm');
            setdisableButton(true);
            return;
        }
        setSelectedFile(file);
        setErrorText('');
        setTextFieldDisabled(true);
        const reader = new FileReader();
        reader.onload = (event: any) => {
            const csvData = event.target.result as string;
            const fileObjects = parseCSV(csvData);
            if (validateCSV(fileObjects)) {
                setdisableButton(false);
                setUploadedFiles(fileObjects.urls);
                console.log('Parsed CSV data:', fileObjects.urls);
            } else {
                setErrorText('CSV файл должен содержать только одну колонку с URL.');
                setdisableButton(true);
            }
        };
        reader.readAsText(file);
    };

    function validateCSV(fileData: { columns: number, urls: string[] }): boolean {
        return fileData.columns === 1;
    }


    return (
        <Box flexDirection={'column'} alignItems='center' justifyContent="center" sx={{ display: 'flex' }}>
            <Paper elevation={6}
                style={{
                    width: '600px', minHeight: '310px', borderRadius: '30px'
                }}>
                <TypographyHeader
                    sx={{
                        textAlign: 'center',
                        mr: 2,
                        mt: 1,
                        pt: 4,
                       
                    }}
                >
                    Определите категорию сайтов
                </TypographyHeader>
                <Box display="flex" alignItems="center" justifyContent="center" flexDirection={'column'} sx={{ mt: 3 }}>
                    <TextField multiline rows={6} onChange={handleMultipleLinksChange} error={error3} helperText={helperText3} disabled={textFieldDisabled}
                        id="outlined-basic" label="Введите ссылки(каждая ссылка с новой строки)" variant="outlined" sx={{ mt: 1, width: '460px' }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <DownloadIcon sx={{ color: 'primary.main' }} />
                                    <input
                                        type="file"
                                        id="fileInput"
                                        style={{ display: 'none' }}
                                        accept=".csv"
                                        onChange={handleFileInputChange}
                                        disabled={disableUploadButton}
                                    />
                                </InputAdornment>
                            ),
                        }} />
                    <label htmlFor="fileInput">
                        <Button sx={{ mt: 1, mb: 2 }}
                            component="span"
                            variant="outlined"
                            color="secondary"
                            startIcon={<CloudUploadIcon />}
                            disabled={disableUploadButton}
                        >
                            Upload Files
                        </Button>
                    </label>
                    <Typography variant="body2" color="error">
                        {errorText}
                    </Typography>
                    <Typography sx={{mb: 2}} variant="body2" color="textSecondary">
                        Требуется файл типа .csv (один столбец с нужными ссылками)
                    </Typography>
                    {selectedFile && (
                        <Paper elevation={3} sx={{ mb: 2, padding: '10px', display: 'flex', alignItems: 'center' }}>
                            <InsertDriveFileIcon sx={{ fontSize: 20, marginRight: '10px', color: '#0A1426' }} />
                            <Typography variant="body2">Выбранный файл: {selectedFile.name}</Typography>
                        </Paper>
                    )}
                </Box>
            </Paper>
            <Button disabled={diasableButton} onClick={handleSubmit} className="gradientButton" style={{ borderRadius: '20px', color: 'white' }} sx={{ mt: 2, ml: 'auto', mr: 'auto' }}>Сгенерировать</Button>
        </Box>
    )
};

export default LinkForm
