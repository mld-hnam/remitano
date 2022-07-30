export const parseRoutesRecursion = (data, authority, feature) => {
  let array = [];
  let breadcrumbs = [];
  if (data && data.length > 0) {
    for (const element of data) {
      const checkAuthority =
        element.authority && element.authority.length > 0
          ? element.authority
          : authority;
      const props = { ...element, authority: checkAuthority };

      if (props["routes"] && props["routes"].length > 0) {
        const { array: itemSub } = parseRoutesRecursion(
          props["routes"],
          props?.authority,
          props?.feature
        );
        if (props?.path) {
          const { routes, ...elmParent } = props;
          array = [...array, elmParent, ...itemSub];
        } else {
          array = [...array, ...itemSub];
          breadcrumbs = [...breadcrumbs, ...itemSub];
        }
      } else {
        array = [
          ...array,
          {
            ...props,
            authority: props?.authority || authority,
            feature: props?.feature || feature,
          },
        ];
        breadcrumbs = [
          ...breadcrumbs,
          {
            ...props,
            name: props?.name,
            path: props?.path,
          },
        ];
      }
    }
  }
  return { array, breadcrumbs };
};
