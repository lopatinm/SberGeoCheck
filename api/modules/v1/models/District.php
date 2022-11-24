<?php
namespace app\modules\v1\models;


use yii\db\ActiveRecord;

/**
 * This is the model class for table "district".
 *
 * @property int $id
 * @property string $name
 * @property string $alias
 * @property string $description
 * @property string $geometry
 *
 * @property Nasleg[] $naslegs
 */

class District extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'district';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'alias', 'geometry'], 'required'],
            [['name', 'alias'], 'string', 'max' => 255],
            [['description', 'geometry'], 'string'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'name',
            'alias' => 'alias',
            'description' => 'description',
            'geometry' => 'geometry',
        ];
    }

    public function fields()
    {
        $fields = parent::fields();
        unset($fields['description']);
        return $fields;
    }


    /**
     * @return \yii\db\ActiveQuery
     */
    public function getNaslegs()
    {
        return $this->hasMany(Nasleg::className(), ['district_id' => 'id']);
    }
}