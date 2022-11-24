<?php
namespace app\modules\v1\models;

use yii\db\ActiveRecord;

/**
 * This is the model class for table "locality".
 *
 * @property int $id
 * @property int $nasleg_id
 * @property string $name
 * @property string $alias
 * @property string $latitude
 * @property string $longitude
 *
 * @property Nasleg $nasleg
 */

class Locality extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'locality';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'alias', 'nasleg_id'], 'required'],
            [['nasleg_id'], 'integer'],
            [['name', 'alias', 'latitude', 'longitude'], 'string', 'max' => 255],
            [['nasleg_id'], 'exist', 'skipOnError' => true, 'targetClass' => Nasleg::className(), 'targetAttribute' => ['nasleg_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'nasleg_id' => 'nasleg id',
            'name' => 'Name',
            'alias' => 'Alias',
            'latitude' => 'latitude',
            'longitude' => 'longitude',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getNasleg()
    {
        return $this->hasOne(Nasleg::className(), ['id' => 'nasleg_id']);
    }

}