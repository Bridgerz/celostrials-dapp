import { Box, Center, Flex, useColorModeValue as mode } from "@chakra-ui/react"
import { ReactNode } from "react"
import { Header } from "../components"

export const Layout = ({ children }: { children?: ReactNode }) => (
  <>
    <div className="stars"></div>
    <div className="twinkling"></div>
    <Header />
    <Flex
      // pt={"5em"}
      zIndex={1}
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      as="main"
    >
      {children}
    </Flex>
  </>
)
