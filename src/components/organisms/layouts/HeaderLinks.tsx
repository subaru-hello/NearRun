import { FC, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
// import escapeStringRegexp from 'escape-string-regexp';
import {
  Box,
  Stack,
  Heading,
  Flex,
  Button,
  useDisclosure,
  Input,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { HamburgerIcon, Search2Icon } from '@chakra-ui/icons';
import { signOut } from 'firebase/auth';
import { auth } from 'Firebase';

const HeaderLinks: FC = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  //ログアウトしたらログインページへリダイレクトさせる
  const navigate = useNavigate();
  // ログイン状態を確認する
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setLoggedIn(true);
      }
    });
  });

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setLoggedIn(false);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'ログアウトしました',
          showConfirmButton: false,
          timer: 1000,
        });
        navigate('/login');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'tighter'}>
          <Link to="/">TrackPublicDB</Link>
        </Heading>
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
        width={{ base: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
        p={4}
        mt={{ base: 4, md: 0 }}
      >
        {/* <Link to="/mock/new">競技場作成</Link> */}
        <Link to="/tracks/kanagawa/calender">個人開放状況</Link>
        <Link to="/tracks">競技場一覧</Link>
        {/* <Link to="/users">ユーザー一覧</Link> */}
        <Search2Icon />
        <Input
          htmlSize={30}
          width="auto"
          type="text"
          placeholder="競技場名を入れて下さい"
        />
      </Stack>

      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
        mt={{ base: 4, md: 0 }}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          p={4}
          mt={{ base: 4, md: 0 }}
        >
          {loggedIn ? (
            <Button onClick={handleLogout}>ログアウト</Button>
          ) : (
            <>
              <Link to="signup">アカウント登録</Link>
              <Link to="login">ログイン</Link>
            </>
          )}
        </Stack>
      </Box>
    </Flex>
  );
};

export default HeaderLinks;
