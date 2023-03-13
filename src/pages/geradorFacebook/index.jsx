import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
  useColorModeValue
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { MdPublic } from 'react-icons/md';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { TfiComment } from "react-icons/tfi";
import { TbShare3 } from "react-icons/tb";

import { getDescriptionsAds, getTitlesAds } from "../../services/getApis";
import CopyClipboard from "../../components/CopyClipboard";
import SideBar from '../../components/SideBar';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function GeradorFacebook() {

  const { t } = useTranslation("common");

  const [isLoadingT, setIsLoadingT] = useState(false);
  const [isLoadingD, setIsLoadingD] = useState(false);
  const [visibility, setVisibility] = useState('hidden');
  const [display, setDisplay] = useState('inline-flex');
  const [display2, setDisplay2] = useState('none');

  const [company, setCompany] = useState();
  const [audience, setAudience] = useState();
  const [resume, setResume] = useState();

  const [keywords, setKeywords] = useState([]);
  const [id, setId] = useState(1);
  const [name, setName] = useState('');

  const [avoidKeywords, setAvoidKeywords] = useState([]);
  const [id2, setId2] = useState(1);
  const [name2, setName2] = useState('');

  const [title1, setTitle1] = useState();
  const [title2, setTitle2] = useState();
  const [title3, setTitle3] = useState();
  const [title4, setTitle4] = useState();
  const [title5, setTitle5] = useState();
  const [title6, setTitle6] = useState();

  const [description1, setDescription1] = useState();
  const [description2, setDescription2] = useState();
  const [description3, setDescription3] = useState();

  const bg = useColorModeValue('white', 'gray.900');
  const bg1 = useColorModeValue('gray.100', 'gray.900');
  const bg2 = useColorModeValue('gray.200', 'gray.800');
  const color = useColorModeValue('primary', 'white');
  const border = useColorModeValue("black", "white");

  const route = useRouter();

  async function onSubmit() {

    const locale = route.locale;

    setIsLoadingT(true);
    setIsLoadingD(true);

    setVisibility('visible');

    var midiaSocial = 'Facebook';

    getTitlesAds(locale, company, resume, audience, keywords.toString(), avoidKeywords.toString(), midiaSocial)
      .then((res) => {
        setIsLoadingT(false);

        const data = res;
        console.log(data);

        data.choices.forEach(element => {
          const el = element.text;

          const titles = el?.split('/');

          setTitle1(titles[0]);
          setTitle2(titles[1]);
          setTitle3(titles[2]);
          setTitle4(titles[3]);
          setTitle5(titles[4]);
          setTitle6(titles[5]);
        })

      })
      .catch((err) => {
        setIsLoadingT(false);
        setVisibility('hidden');
        console.log(err);
      })
      .finally();

    getDescriptionsAds(locale, company, resume, audience, keywords.toString(), avoidKeywords.toString(), midiaSocial)
      .then((res) => {
        setIsLoadingD(false);

        const data = res;
        console.log(data);

        data.choices.forEach(element => {
          const el = element.text;

          const descriptions = el?.split('/');

          setDescription1(descriptions[0]);
          setDescription2(descriptions[1]);
          setDescription3(descriptions[2]);
        })

      })
      .catch((err) => {
        setIsLoadingD(false);
        setVisibility('hidden');
        console.log(err);
      })
      .finally();
  }

  const arrayTitles = [`${title1}`, `${title2}`, `${title3}`];
  const arrayDescriptions = [`${description1}`, `${description2}`, `${description3}`];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = () => {
      setIndex(prevIndex => {
        if (prevIndex === arrayTitles.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      })
    };
    setInterval(timer, 20000);

    //cleanup function in order clear the interval timer
    //when the component unmounts
    return () => { clearInterval(timer); }
  }, []);

  useEffect(() => {
    const timer = () => {
      setIndex(prevIndex => {
        if (prevIndex === arrayDescriptions.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      })
    };
    setInterval(timer, 20000);

    //cleanup function in order clear the interval timer
    //when the component unmounts
    return () => { clearInterval(timer); }
  }, []);

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.key === 'Enter') {
      handleAddClick();
    }
  }

  const handleKeypress2 = e => {
    //it triggers by pressing the enter key
    if (e.key === 'Enter') {
      handleAddClick2();
    }
  }

  const handleAddClick = (event) => {
    // event.preventDefault();
    if (name != '') {
      setId(id => id + 1);
      setKeywords(list => [...list, name]);
      setName('');
    }
  }

  const handleAddClick2 = (event) => {
    if (name2 != '') {
      setId2(id => id + 1);
      setAvoidKeywords(list => [...list, name2]);
      setName2('');
    }
  }

  const handleClear = () => {
    setId(0);
    setKeywords([]);
  }

  const handleClear2 = () => {
    setId2(0);
    setAvoidKeywords([]);
  }

  const handleEdit = () => {

    setDisplay('none');
    setDisplay2('inline');
  }

  const handleSave = () => {

    setDisplay('inline-flex');
    setDisplay2('none');
  }

  const fields = [
    {
      isRequired: true,
      id: 'company',
      title: t('nomeEmpresa'),
      value: company,
      onChange: (e) => setCompany(e.target.value)
    },
    {
      isRequired: true,
      id: 'audience',
      title: t('audiencia'),
      value: audience,
      onChange: (e) => setAudience(e.target.value)
    }
  ]

  const editFields = [
    {
      id: 'title1',
      title: `${t('titulo')} 1`,
      value: title1 || '',
      onChange: (e) => setTitle1(e.target.value),
      colSpan: 1
    },
    {
      id: 'title2',
      title: `${t('titulo')} 2`,
      value: title2 || '',
      onChange: (e) => setTitle2(e.target.value),
      colSpan: 1
    },
    {
      id: 'title3',
      title: `${t('titulo')} 3`,
      value: title3 || '',
      onChange: (e) => setTitle3(e.target.value),
      colSpan: 1
    },
    {
      id: 'title4',
      title: `${t('titulo')} 4`,
      value: title4 || '',
      onChange: (e) => setTitle4(e.target.value),
      colSpan: 1
    },
    {
      id: 'title5',
      title: `${t('titulo')} 5`,
      value: title5 || '',
      onChange: (e) => setTitle5(e.target.value),
      colSpan: 1
    },
    {
      id: 'title6',
      title: `${t('titulo')} 6`,
      value: title6 || '',
      onChange: (e) => setTitle6(e.target.value),
      colSpan: 1
    },
    {
      id: 'description1',
      title: `${t('descricao')} 1`,
      value: description1 || '',
      onChange: (e) => setDescription1(e.target.value),
      colSpan: 2
    },
    {
      id: 'description2',
      title: `${t('descricao')} 2`,
      value: description2 || '',
      onChange: (e) => setDescription2(e.target.value),
      colSpan: 2
    },
    {
      id: 'description3',
      title: `${t('descricao')} 3`,
      value: description3 || '',
      onChange: (e) => setDescription3(e.target.value),
      colSpan: 2
    }
  ]

  const itemsHeadlines = [
    {
      color: title1?.replace(/\s/g, '').length > 30 ? 'red' : 'green',
      title: `${t('titulo')} 1:`,
      total: title1?.replace(/\s/g, '').length,
      cont: 30
    },
    {
      color: title2?.replace(/\s/g, '').length > 30 ? 'red' : 'green',
      title: `${t('titulo')} 2:`,
      total: title2?.replace(/\s/g, '').length,
      cont: 30
    },
    {
      color: title3?.replace(/\s/g, '').length > 30 ? 'red' : 'green',
      title: `${t('titulo')} 3:`,
      total: title3?.replace(/\s/g, '').length,
      cont: 30
    },
    {
      color: title4?.replace(/\s/g, '').length > 30 ? 'red' : 'green',
      title: `${t('titulo')} 4:`,
      total: title4?.replace(/\s/g, '').length,
      cont: 30
    },
    {
      color: title5?.replace(/\s/g, '').length > 30 ? 'red' : 'green',
      title: `${t('titulo')} 5:`,
      total: title5?.replace(/\s/g, '').length,
      cont: 30
    },
    {
      color: title6?.replace(/\s/g, '').length > 30 ? 'red' : 'green',
      title: `${t('titulo')} 6:`,
      total: title6?.replace(/\s/g, '').length,
      cont: 30
    }
  ]

  const itemsDescriptions = [
    {
      color: description1?.replace(/\s/g, '').length > 90 ? 'red' : 'green',
      title: `${t('descricao')} 1:`,
      total: description1?.replace(/\s/g, '').length,
      cont: 90
    },
    {
      color: description2?.replace(/\s/g, '').length > 90 ? 'red' : 'green',
      title: `${t('descricao')} 2:`,
      total: description2?.replace(/\s/g, '').length,
      cont: 90
    },
    {
      color: description3?.replace(/\s/g, '').length > 90 ? 'red' : 'green',
      title: `${t('descricao')} 3:`,
      total: description3?.replace(/\s/g, '').length,
      cont: 90
    }
  ]

  return (
    // <ProtectedRoute>>
      <SideBar
        nomePagina={`${t('gerador')} Facebook`}>
        <Grid
          templateColumns={{
            lg: 'repeat(3,1fr)',
            sm: 'repeat(1,1fr)'
          }}
          gap='12'>
          <GridItem>
            <form>
              <Flex
                flexDir={'column'}
                gap={'4'}>
                {fields.map((item, idx) => (
                  <Field
                    key={idx}
                    isRequired={item.isRequired}
                    id={item.id}
                    title={item.title}
                    value={item.value}
                    onChange={item.onChange} />
                ))}
                <FormControl
                  isRequired={true}>
                  <FormLabel
                    htmlFor={'description'}>
                    {t('descricaoEmpresa')}
                  </FormLabel>
                  <Textarea
                    id={'description'}
                    borderRadius={'30px'}
                    rows='6'
                    borderColor={border}
                    value={resume || ''}
                    onChange={(e) => setResume(e.target.value)} />
                </FormControl>
                <Flex
                  w='full'
                  flexDir={'column'}
                  gap='4'>
                  <FormControl
                    isRequired>
                    <FormLabel>
                      {t('adicionarPalavraChave')}
                    </FormLabel>
                    <Flex
                      align={'center'}
                      gap='2'>
                      <Input
                        isRequired={true}
                        borderColor={border}
                        value={name}
                        borderRadius={"30px"}
                        onKeyPress={handleKeypress}
                        onChange={(e) => setName(e.target.value)} />
                      <Button
                        onClick={handleAddClick}
                        variant='button'>
                        {t('adicionar')}
                      </Button>
                      <Button
                        onClick={handleClear}
                        variant='button-outline'
                        color={color}
                        borderColor={color}>
                        {t('limpar')}
                      </Button>
                    </Flex>
                  </FormControl>
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
                      )
                    })}
                  </div>
                </Flex>
                <Flex
                  w='full'
                  flexDir={'column'}
                  gap='4'>
                  <FormControl
                    isRequired>
                    <FormLabel>
                      {t('evitarPalavraChave')}
                    </FormLabel>
                    <Flex
                      align={'center'}
                      gap='2'>
                      <Input
                        isRequired={true}
                        borderColor={border}
                        value={name2}
                        borderRadius={"30px"}
                        onKeyPress={handleKeypress2}
                        onChange={(e) => setName2(e.target.value)} />
                      <Button
                        onClick={handleAddClick2}
                        variant='button'>
                        {t('adicionar')}
                      </Button>
                      <Button
                        onClick={handleClear2}
                        variant='button-outline'
                        color={color}
                        borderColor={color}>
                        {t('limpar')}
                      </Button>
                    </Flex>
                  </FormControl>
                  <div>
                    {avoidKeywords.map((item) => {
                      const handleRemoveClick = () => {
                        setAvoidKeywords(list => list.filter((entry) => entry !== item));
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
                      )
                    })}
                  </div>
                </Flex>
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
              w='2xl'
              flexDir={'column'}
              bg={bg}
              display={display}
              gap={'4'}
              alignItems={'initial'}>
              {isLoadingD
                ?
                <CircularProgress
                  isIndeterminate />
                :
                <Flex
                  flexDir={'column'}
                  gap='2'>
                  <Flex
                    align={'center'}
                    gap='2'>
                    <Avatar />
                    <Flex
                      flexDir={'column'}
                      gap='1'>
                      <Text
                        fontWeight={'semibold'}>
                        {company}
                      </Text>
                      <MdPublic color="gray" />
                    </Flex>
                  </Flex>
                  <Text
                    mb='-2'>
                    {arrayDescriptions[index]}
                    {/* {title1}/{title2}/{title3}/{title4}/{title5}/{title6} */}
                  </Text>
                </Flex>
              }
              {isLoadingT
                ?
                <CircularProgress
                  isIndeterminate />
                :
                <Box
                  boxShadow={'base'}>
                  <Flex
                    flexDir={'column'}
                    bg={bg1}
                    borderRadius={'lg'}>
                    <Image
                      src='/images/webpeak.png'
                      h='md' />
                    <Flex
                      flexDir={'column'}
                      p='2'
                      fontSize={'14px'}>
                      <Text
                        textTransform={'uppercase'}
                        color={'gray.600'}>
                        {company}.com
                      </Text>
                      <Flex
                        align='center'
                        justifyContent={'space-between'}>
                        <Text
                          fontWeight={'bold'}
                          fontSize='17px'>
                          {arrayTitles[index]}
                          {/* {description1}/{description2}/{description3} */}
                        </Text>
                        <Button
                          fontSize={'sm'}
                          bg={bg2}
                          py='1'
                          cursor={'default'}
                          h='min-content'>Saiba Mais</Button>
                      </Flex>
                      <Text
                        color={'gray.600'}>
                        {arrayTitles[index]}
                        {/* {description1}/{description2}/{description3} */}
                      </Text>
                    </Flex>
                    <Divider />
                  </Flex>
                  <Flex
                    justifyContent={'space-between'}
                    px='4'
                    py='2'
                    fontSize={'15px'}
                    color='gray.600'>
                    <Flex
                      align={'center'}
                      gap='2'>
                      <AiFillLike color='#3b5998' />
                      100 {t('curtidas')}
                    </Flex>
                    20 {t('comentarios')} ‎ ‎ 9 {t('compartilhamentos')}
                  </Flex>
                  <Flex
                    justifyContent={'space-around'}
                    p='2'
                    fontSize={'15px'}
                    color='gray.600'>
                    <Flex
                      align={'center'}
                      gap='2'>
                      <AiOutlineLike />
                      {t('curtir')}
                    </Flex>
                    <Flex
                      align={'center'}
                      gap='2'>
                      <TfiComment />
                      {t('comentar')}
                    </Flex>
                    <Flex
                      align={'center'}
                      gap='2'>
                      <TbShare3 />
                      {t('compartilhar')}
                    </Flex>
                  </Flex>
                </Box>
              }
              {isLoadingD
                ?
                <CircularProgress
                  isIndeterminate />
                :
                <>
                  <Flex
                    display={display}
                    flexWrap='wrap'>
                    {itemsHeadlines.map((item, idx) => (
                      <Item
                        key={idx}
                        color={item.color}
                        title={item.title}
                        total={item.total}
                        cont={item.cont} />
                    ))}
                  </Flex>
                  <Flex
                    display={display}>
                    {itemsDescriptions.map((item, idx) => (
                      <Item
                        key={idx}
                        color={item.color}
                        title={item.title}
                        total={item.total}
                        cont={item.cont} />
                    ))}
                  </Flex>
                </>
              }
              <Box
                w='100%'>
                <Button
                  onClick={handleEdit}
                  bg='none'
                  border='1px'
                  borderRadius={'30px'}
                  borderColor={color}
                  display={display}
                  w='min-content'
                  px='2'
                  color={color}
                  fontWeight='normal'>
                  Visualizar títulos e descrições
                </Button>
              </Box>
            </Flex>
            <Box
              display={display2}
              w='100%'>
              <Grid
                templateColumns={{
                  lg: 'repeat(2,1fr)'
                }}
                flexDir={'column'}
                gap='4'>
                {editFields.map((item, idx) => (
                  <EditableField
                    key={idx}
                    id={item.id}
                    title={item.title}
                    value={item.value}
                    onChange={item.onChange}
                    colSpan={item.colSpan} />
                ))}
                <GridItem
                  colSpan={2}>
                  <Button
                    onClick={handleSave}
                    float='right'
                    variant='button-orange'
                    w='40'>
                    {t('salvar')}
                  </Button>
                </GridItem>
              </Grid>
            </Box>
          </GridItem>
        </Grid>
      </SideBar>
    // </ProtectedRoute>
  )
}
const EditableField = ({
  colSpan,
  isRequired,
  id,
  title,
  value,
  onChange
}) => {
  const bg = useColorModeValue('white', 'gray.900');
  const border = useColorModeValue("black", "white");

  return (
    <GridItem
      colSpan={{
        lg: colSpan,
        sm: 2
      }}>
      <FormControl
        isRequired={isRequired}>
        <Flex
          justifyContent={'space-between'}
          align='center'>
          <FormLabel
            htmlFor={id}>
            {title}
          </FormLabel>
          <CopyClipboard
            copyText={value} />
        </Flex>
        <Input
          borderRadius={'30px'}
          bg={bg}
          borderColor={border}
          id={id}
          mt='2'
          value={value || ''}
          onChange={onChange} />
      </FormControl>
    </GridItem>
  )
}

const Field = ({
  isRequired,
  id,
  title,
  value,
  onChange,
  handleKeyDown,
  onKeyPress
}) => {
  const border = useColorModeValue("black", "white");

  return (
    <FormControl
      isRequired={isRequired}>
      <FormLabel
        htmlFor={id}>
        {title}
      </FormLabel>
      <Input
        borderRadius={'30px'}
        borderColor={border}
        id={id}
        value={value || ''}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onKeyPress={onKeyPress} />
    </FormControl>
  )
}

const Item = ({
  color,
  title,
  total,
  cont }) => {
  return (
    <Tag
      colorScheme={color}
      fontSize='16px'
      mr='2'
      mb='2'>
      <TagLabel>
        {title}{' '}{total}/{cont}{' '}char
      </TagLabel>
    </Tag>
  )
}