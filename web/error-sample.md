```typescript


    this.route.params.subscribe(params => {
      this.buildingService.getById(+params.id)
        .subscribe(building => this.setBuilding(building));
    })
  }

  setBuilding(building: Building): void {
    this.validateBuilding(building);
    this.formGroup.get(this.formKeys.id)?.setValue(building.id);
    this.formGroup.get(this.formKeys.name).setValue(building.name);
    this.formGroup.get(this.formKeys.villageName).setValue(building.village.name);
    this.formGroup.get(this.formKeys.horizontalOffset).setValue(building.horizontalOffset);
    this.formGroup.get(this.formKeys.verticalOffset).setValue(building.verticalOffset);
    this.formGroup.get(this.formKeys.units).setValue(building.unitCount);
    this.formGroup.get(this.formKeys.type).setValue(building.type);
    this.formGroup.get(this.formKeys.maxFloor).setValue(building.maxFloor);
  }
```

<hr>

```typescript
  /**
   * 提交
   * @param formGroup 表单
   */
  onSubmit(formGroup: FormGroup): void {
    console.log(formGroup.value);
    const newBuilding = {
      village: {
        id: this.formGroup.get(this.formKeys.villageId).value as number,
      } as Village,
      name: this.formGroup.get(this.formKeys.name).value as string,
      horizontalOffset: this.formGroup.get(this.formKeys.horizontalOffset).value as number,
      verticalOffset: this.formGroup.get(this.formKeys.verticalOffset).value as number,
      houseType: this.formGroup.get(this.formKeys.houseType).value as HouseType,
      unitCount: this.formGroup.get(this.formKeys.unitCount).value as number,
      maxFloor: this.formGroup.get(this.formKeys.maxFloor).value as number,
      housesLengthOfFloor: this.formGroup.get(this.formKeys.housesLengthOfFloor) as number,
    } as Building;
```


```typescript
  onSubmit(formGroup: FormGroup): void {
    const newCommunity = new Community({
      name: this.formGroup.get('name').value,
      pinyin: this.formGroup.get('pinyin').value,
      town: {
        id: this.formGroup.get('townId').value
      } as Town
    })
```
