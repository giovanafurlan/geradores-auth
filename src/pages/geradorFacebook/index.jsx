import { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Textarea,
  useColorModeValue
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { getSocialMedia } from "../../services/getApis";
import CopyClipboard from "../../components/CopyClipboard";
import SideBar from '../../components/SideBar';
import ProtectedRoute from '../../components/ProtectedRoute';
import Descriptions from '../../components/Descriptions';
import Keywords from '../../components/Keywords';

export default function GeradorFacebook() {

  const { t } = useTranslation("common");

  const [isLoading, setIsLoading] = useState(false);
  const [visibility, setVisibility] = useState('hidden');

  const [topic, setTopic] = useState();

  const [keywords, setKeywords] = useState([]);
  const [id, setId] = useState(1);
  const [name, setName] = useState('');

  const [result, setResult] = useState([]);

  const [count, setCount] = useState(0);
  const [countTag, setCountTag] = useState('');
  const [visibilityTag, setVisibilityTag] = useState('hidden');
  const [colorful, setColorful] = useState('gray');

  const bg = useColorModeValue('white', 'gray.900');
  const border = useColorModeValue('black', 'white');

  const route = useRouter();

  async function onSubmit() {

    const locale = route.locale;

    setIsLoading(true);

    setVisibility('visible');

    var caracteres = 20;
    var midiaSocial = 'Facebook';

    getSocialMedia(locale, caracteres, topic, keywords.toString(), midiaSocial)
      .then((res) => {
        setIsLoading(false);

        const data = res;
        console.log(data);

        data.choices.forEach(element => {
          const el = element.text;

          const list = el.split('/');

          setResult(list);
        })

      })
      .catch((err) => {
        setIsLoading(false);
        setVisibility('hidden');
        console.log(err);
      })
      .finally();
  }

  useEffect(() => {
    if (count >= 1) {
      setVisibilityTag('visible');
      if (count <= 50) {
        setColorful('red');
        setCountTag('Fraco');
      } else if (count >= 51 && count <= 100) {
        setColorful('yellow');
        setCountTag('Justo');
      } else {
        setColorful('green');
        setCountTag('Ótimo');
      }
    } else {
      setVisibilityTag('hidden');
    }
  }, [count]);

  const handleKeypress = e => {
    if (e.key === 'Enter') {
      handleAddClick();
    }
  }

  const handleAddClick = () => {
    if (name != '') {
      setId(id => id + 1);
      if (keywords.length < 3) {
        setKeywords(list => [...list, name]);
      }
      setName('');
    }
  }

  const handleClear = () => {
    setId(0);
    setKeywords([]);
  }

  return (
    // <ProtectedRoute>>
    <SideBar
      nomePagina={`${t('gerador')} Facebook`}>
      <Grid
        templateColumns={{
          lg: 'repeat(3,1fr)',
          sm: 'repeat(1,1fr)'
        }}
        gap='6'>
        <GridItem>
          <form>
            <Flex
              flexDir={'column'}
              gap={'4'}
              align='center'>
              <Descriptions
                label={t('topico')}
                tooltip={'topico'}
                value={topic}
                changeDescription={(e) => { setTopic(e.target.value);; setCount(e.target.value.length) }}
                count={count}
                colorful={colorful}
                countTag={countTag}
                visibilityTag={visibilityTag} />
              <Keywords
                required={true}
                label={t('palavraChave')}
                tooltip={'palavraChave'}
                name={name}
                keyPress={handleKeypress}
                changeName={(e) => setName(e.target.value)}
                addClick={handleAddClick}
                clear={handleClear}>
                <div>
                  {keywords.map((item) => {
                    const handleRemoveClick = () => {
                      setKeywords(list => list.filter((entry) => entry !== item));
                    };
                    return (
                      <Tag
                        key={item}
                        borderRadius='full'
                        variant='solid'
                        colorScheme='purple'
                        mr='2'
                        mb='2'>
                        <TagLabel>
                          {item}
                        </TagLabel>
                        <TagCloseButton
                          onClick={handleRemoveClick} />
                      </Tag>
                    );
                  })}
                </div>
              </Keywords>
              <Button
                value='Generate'
                w='100%'
                mt='4'
                variant='button-orange'
                onClick={() => { onSubmit() }}>
                {t('gerar')}
              </Button>
            </Flex>
          </form>
        </GridItem>
        <GridItem
          colSpan={'2'}
          visibility={visibility}>
          <Flex
            flexDir={'column'}
            bg={bg}
            borderRadius={'30px'}
            p='4'
            gap={'4'}
            alignItems={'initial'}>
            {isLoading
              ?
              <CircularProgress
                isIndeterminate />
              :
              <Flex
                flexDir={'column'}
                gap='4'>
                {result?.map((item) => (
                  <Flex
                    key={item}
                    align='center'
                    gap='2'>
                    <Textarea
                      borderRadius={'30px'}
                      borderColor={border}
                      bg={bg}
                      key={item}
                      defaultValue={item}
                      readOnly />
                    <CopyClipboard
                      copyText={item} />
                  </Flex>
                ))}
              </Flex>
            }
          </Flex>
        </GridItem>
      </Grid>
    </SideBar>
    // </ProtectedRoute>
  )
}