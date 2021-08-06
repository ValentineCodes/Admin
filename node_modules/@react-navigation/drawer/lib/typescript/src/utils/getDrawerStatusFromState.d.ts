import type { DrawerNavigationState, ParamListBase } from '@react-navigation/native';
export default function getDrawerStatusFromState(state: DrawerNavigationState<ParamListBase>): "open" | "closed";
