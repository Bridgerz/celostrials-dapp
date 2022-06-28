import { Center, Button, Divider, useBreakpointValue } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Box,
  VStack,
  Image,
  Text,
  Link,
  HStack,
  Heading,
} from "@chakra-ui/react"
import { faBolt, faCompass, faCubes } from "@fortawesome/free-solid-svg-icons"
import colors from "../../styles/theme/foundations/colors"
import { Socials } from "../Header"

export const HomeFooter = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <VStack alignSelf="center" my="3em">
      <Text fontSize={{ md: "lg", base: "md" }}>
        VERIFIED SMART CONTRACT ADDRESS:
      </Text>
      <Link
        href="https://explorer.celo.org/address/0xAc80c3c8b122DB4DcC3C351ca93aC7E0927C605d"
        target="_blank"
        mb="2em !important"
        mt="0 !important"
      >
        <Text fontSize={{ md: "lg", base: "xs" }} color={colors.orange.dark}>
          0xAc80c3c8b122DB4DcC3C351ca93aC7E0927C605d
        </Text>
      </Link>
      <HStack w="100%" justifyContent={{ md: "initial", base: "center" }}>
        <Divider borderColor="white" opacity="1" size="xl" />
        <Image
          alt="celostrials"
          w={{ md: "20em", base: "10em" }}
          src="images/celostrials_footer.png"
        />
        {isMobile && <Divider borderColor="white" opacity="1" size="xl" />}

        {!isMobile && (
          <VStack w="100%" mt="-2.5em !important" alignItems="flex-end">
            <Socials />
            <Divider borderColor="white" opacity="1" size="xl" />
          </VStack>
        )}
      </HStack>
    </VStack>
  )
}
