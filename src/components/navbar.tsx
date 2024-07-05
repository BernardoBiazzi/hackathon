/* eslint-disable @next/next/no-img-element */
import { Button, Dialog, Flex, StarRating, Text } from '@ifood/pomodoro-components';
import { Star, Switch } from '@ifood/pomodoro-icons';
import { useMerchant } from 'context/merchantContext';
import { useState } from 'react';
import styled from 'styled-components';

const NavContainer = styled.div`
  display: flex;
  border-right: solid 1px #dcdcdc;
  flex-direction: column;
  padding-top: 48px;
  align-items: center;
  gap: 16px;

  img {
    width: 25%;
    aspect-ratio: 1;
    border-radius: 50px;
  }

  button {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .link {
    width: 100%;
    display: flex;
    padding-left: 24px;
    align-items: center;
    border-radius: 0;
    background-color: #fcebea;
  }
`;

const Line = styled.div`
  flex: auto;
  background-color: #dcdcdc;
  height: 1px;
  margin: auto;
`;

const SwitchStoresDialog = styled.div`
  width: 500px;
  height: 50dvh;
  overflow: hidden;
  padding-bottom: 0px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;

  .select-store {
    position: absolute;
    background: white;
    width: 100%;
    border-radius: 12px 12px 0px 0px;
  }
`;

const ListMerchant = styled.div`
  margin-top: 72px;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const MerchantOption = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  border-bottom: solid 1px #dcdcdc;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }

  img {
    width: 10%;
    aspect-ratio: 1;
    border-radius: 50px;
  }
`;

/**
 * This component is for Learning purposes only
 */
export const Navbar = () => {
  const { selectedMerchant, merchants, handleSelectMerchant } = useMerchant();
  const [dialogOpen, setDialogOpen] = useState(false);

  const closeDialog = () => setDialogOpen(false);
  const handleSelectMerchantDialog = (merchant: any) => {
    handleSelectMerchant(merchant);
    closeDialog();
  };

  return (
    <NavContainer>
      <img alt={selectedMerchant.merchant_name} src={selectedMerchant.site_logo_url}></img>
      <Text fontWeight="500" textAlign="center">
        {selectedMerchant.merchant_name}
      </Text>
      <Button variant="primary-inverted" onClick={() => setDialogOpen(true)}>
        <Switch></Switch> Trocar loja
      </Button>
      <Flex width="100%" px="24px">
        <Text marginRight="16px" fontSize="14px">
          Marketing
        </Text>
        <Line></Line>
      </Flex>
      <Button variant="primary-inverted" className="link">
        <Star></Star>
        <Text color="#ea1d2c">iFood Engaja</Text>
      </Button>
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <SwitchStoresDialog>
          <Text className="select-store" padding="24px" fontSize="20px" fontWeight="bold">
            Selecione uma loja:
          </Text>
          <ListMerchant>
            {merchants.map((merchant) => (
              <MerchantOption key={merchant.merchant_id} onClick={() => handleSelectMerchantDialog(merchant)}>
                <img alt={merchant.merchant_name} src={merchant.site_logo_url}></img>
                <Text>{merchant.merchant_name}</Text>
              </MerchantOption>
            ))}
          </ListMerchant>
        </SwitchStoresDialog>
      </Dialog>
    </NavContainer>
  );
};
