import LinkForm from "../widgets/LinkForm"
import { TypographyHeader } from "../ui/Typography"

function MainPage() {

  return (
    <>
      <div style={{
        width: '100%', height: 'calc(100vh - 76px)', flexWrap: 'wrap',
        display: 'flex',
        justifyContent: 'center', flexDirection: 'column'
      }}>
        <TypographyHeader sx={{ color: 'white', alignSelf: 'center', mb: 5 }}>
          Сервис для автоматического определения категории сайта на основе машинного обучения
        </TypographyHeader>
        <LinkForm />
      </div>
    </>
  )
}

export default MainPage
